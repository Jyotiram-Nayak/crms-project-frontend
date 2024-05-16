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
  const [universities, setUniversities] = useState<University[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  };

  //function to upload an image in firebase
  const uploadPdf = async () => {
    if (file == null) return;
    const allowedExtensions = ['pdf'];
    // const fileExtension = file.name.split(".").pop().toLowerCase();
    const fileExtension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowedExtensions.includes(fileExtension)) {
        console.error("Invalid file type. Only PDF files are allowed.");
        ToastError("Invalid file type. Only PDF files are allowed.");
        return;
    }
    const randomId = Math.random().toString(36).substring(2);
    const imagePath = `jobpost-pdf/${randomId}.${fileExtension}`;
    const imageRef = ref(storage, imagePath);
    try {
      await uploadBytes(imageRef, file);
      console.log("pdf uploaded");
      const downloadURL = await getDownloadURL(imageRef);
      if (downloadURL != null) {
        console.log("pdf URL:", downloadURL);
        values.document = downloadURL;
        ToastSuccess("pdf Uploaded successfully.");
        setFile(null)
      }
    } catch (error) {
      console.error("Error uploading pdf:", error);
      ToastError("Failed to Uploaded pdf.");
      return null;
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: jobSchema,
      onSubmit: async (values, { resetForm }) => {
        values.courses = selected;
        console.log("form values", values);
        const response = await dispatch(addJob(values));
        console.log(response);
        if (response.payload?.success) {
          ToastSuccess(response.payload?.message);
          resetForm();
          setFile(null);
        } else if (response.error?.message) {
          ToastError(response.error.message || "An error occurred.");
        }
      },
    });
  console.log(errors);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getAllUniversity());
        response?.payload?.data && setUniversities(response?.payload?.data);
        console.log("all university", response?.payload?.data);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Job Posting" />
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Job Posting
              </h3>
              <Displaybutton path="/company/jobpost-table" text="All Job Posts" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="w-full">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Select University
                  </label>
                  <select
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="universityId"
                    id="universityId"
                    value={values.universityId}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select University
                    </option>
                    {universities.map((university) => (
                      <option key={university.id} value={university.id}
                        onChange={handleChange}>
                        {university.firstName + " " + university.lastName}
                      </option>
                    ))}
                  </select>
                  {errors.universityId && touched.universityId ? (
                    <p className="text-red">{errors.universityId}</p>
                  ) : null}
                </div>
                <MultiSelect id="courses" courses={StudentCourse} selected={selected} setSelected={setSelected} values={values} error={errors} />
                <div className="w-full ">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                  </label>
                  <textarea
                    rows={6}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                  </label>
                  <input
                    type="date"
                    placeholder="Enter deadline for the post"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="deadline"
                    id="deadline"
                    value={values.deadline}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.deadline && touched.deadline ? (
                    <p className="text-red">{errors.deadline}</p>
                  ) : null}
                </div>

                <div className="w-full ">
                  <div className="flex justify-between mb-2 my-1">
                    <label className="block text-sm font-medium text-black dark:text-white">
                      Document
                    </label>
                    <button type="button" onClick={uploadPdf} className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium bg-success text-success">
                      upload
                    </button>
                  </div>
                  <input
                    type="file"
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    placeholder="Plese select an Image"
                    name="file"
                    id="file"
                    onChange={onFileChange}
                  // onClick={onClick}
                  />
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
