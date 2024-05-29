"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import MultiSelect from "@/components/FormElements/MultiSelect/MultiSelect";
import Displaybutton from "@/components/FormElements/buttons/Displaybutton";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {
  ToastError,
  ToastSuccess,
} from "@/components/ToastMessage/ToastMessage";
import { storage } from "@/firebase/firebase";
import { addJob } from "@/lib/JobSlice/JobSlice";
import { getAllUniversity } from "@/lib/UserSlice/UserSlice";
import { jobSchema } from "@/schema";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { StudentCourse } from "@/components/Enum/StudentCourse";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/common/Loader";
import { ToastContainer } from "react-toastify";

interface FormValues {
  universityId: string;
  courses: number[];
  title: string;
  description: string;
  deadline: string;
  document: string;
}

const initialValues: FormValues = {
  universityId: "",
  courses: [],
  title: "",
  description: "",
  deadline: "",
  document: "",
};

interface University {
  id: string;
  firstName: string;
  lastName: string;
}

const JobPoasting = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [universities, setUniversities] = useState<University[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const universityId = searchParams.get("universityId");
  const today = new Date().toISOString().split("T")[0];
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const newfile = e.target.files?.[0];
    const allowedExtensions = ["pdf"];
    const fileExtension = newfile.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowedExtensions.includes(fileExtension)) {
      ToastError("Invalid file type. Only PDF files are allowed.");
      return;
    }
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    setFieldValue("universityId", universityId);
  }, [universityId]);

  useEffect(() => {
    if (file && file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file);
      setPdfPreview(fileURL);
    }
  }, [file]);

  //function to upload an image in firebase
  const uploadPdf = async () => {
    if (file == null) return;
    setIsLoading(true);
    const allowedExtensions = ["pdf"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowedExtensions.includes(fileExtension)) {
      console.error("Invalid file type. Only PDF files are allowed.");
      ToastError("Invalid file type. Only PDF files are allowed.");
      setIsLoading(false);
      return;
    }
    const randomId = Math.random().toString(36).substring(2);
    const imagePath = `jobpost-pdf/${randomId}.${fileExtension}`;
    const imageRef = ref(storage, imagePath);
    try {
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      if (downloadURL != null) {
        values.document = downloadURL;
        ToastSuccess("pdf Uploaded successfully.");
        errors.document = "";
        setFile(null);
      }
    } catch (error) {
      console.error("Error uploading pdf:", error);
      ToastError("Failed to Uploaded pdf.");
      setIsLoading(false);
      return null;
    }
    setIsLoading(false);
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: jobSchema,
    onSubmit: async (values, { resetForm }) => {
      values.courses = selected;
      setIsLoading(true);
      const response = await dispatch<any>(addJob(values));
      if (response.payload?.success) {
        ToastSuccess(response.payload?.message);
        route.replace("/company/jobpost-table");
        setFile(null);
      } else if (response.error?.message) {
        ToastError(response.error.message || "An error occurred.");
      }
      setIsLoading(false);
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getAllUniversity());
        response?.payload?.data && setUniversities(response?.payload?.data);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <ToastContainer/>
      {isLoading && <Loader />}
      <DefaultLayout>
        <Breadcrumb pageName="Job Posting" />
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Job Posting
              </h3>
              <Displaybutton
                path="/company/jobpost-table"
                text="All Job Posts"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="w-full">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Select University
                    <span className="text-red">*</span>
                  </label>
                  <select
                    className="w-full rounded mb-2 border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="universityId"
                    id="universityId"
                    value={universityId ? values.universityId : ""}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select University
                    </option>
                    {universities.map((university) => (
                      <option
                        key={university.id}
                        value={university.id}
                        onChange={handleChange}
                      >
                        {university.firstName + " " + university.lastName}
                      </option>
                    ))}
                  </select>
                  {errors.universityId && touched.universityId ? (
                    <p className="text-red">{errors.universityId}</p>
                  ) : null}
                </div>
                <MultiSelect
                  id="courses"
                  courses={StudentCourse}
                  selected={selected}
                  setSelected={setSelected}
                  values={values}
                  error={errors}
                />
                <div className="w-full ">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Title
                    <span className="text-red">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Title"
                    className="w-full rounded  mb-2 border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="title"
                    id="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title ? (
                    <p className="text-red">{errors.title}</p>
                  ) : null}
                </div>
                <div className="w-full">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description
                    <span className="text-red">*</span>
                  </label>
                  <textarea
                    rows={6}
                    className="w-full rounded mb-2 border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Type your Description"
                    name="description"
                    id="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></textarea>
                </div>

                <div className="w-full ">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Deadline
                    <span className="text-red">*</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Enter deadline for the post"
                    className="w-full rounded mb-2 border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="deadline"
                    id="deadline"
                    value={values.deadline}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={today}
                  />
                  {errors.deadline && touched.deadline ? (
                    <p className="text-red">{errors.deadline}</p>
                  ) : null}
                </div>

                <div className="w-full ">
                  <div className="flex justify-between mb-2 my-1">
                    <label className="block text-sm font-medium text-black dark:text-white">
                      Document
                      <span className="text-red">*</span>{file && file.name}
                    </label>
                    {pdfPreview && (
                      <Link href={pdfPreview} target="blanck">
                        <button
                          type="button"
                          className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium bg-success text-success  dark:text-white"
                        >
                          <svg
                            className="h-4 w-4 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          &nbsp;Preview
                        </button>
                      </Link>
                    )}
                  </div>
                  <div className="flex">
                    <input
                      type="file"
                      className="w-full me-2 mb-2 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      placeholder="Plese select an Image"
                      name="file"
                      id="file"
                      onChange={onFileChange}
                    />
                    {file && (
                      <button
                        onClick={uploadPdf}
                        type="button"
                        className="bg-success font-medium hover:bg-opacity-90 p-3 rounded text-gray"
                      >
                        Upload
                      </button>
                    )}
                  </div>
                  {errors.document && touched.document ? (
                    <p className="text-red">{errors.document}</p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="mt-2 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default JobPoasting;
