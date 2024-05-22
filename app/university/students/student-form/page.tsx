"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Displaybutton from "@/components/FormElements/buttons/Displaybutton";
import { useDispatch } from "react-redux";
import { addStudent, importExcelFile } from "@/lib/StudentSlice/StudentSlice";
import { studentSchema } from "@/schema";
import {
  ToastError,
  ToastSuccess,
} from "@/components/ToastMessage/ToastMessage";
import { useRouter } from "next/navigation";
import { stat } from "fs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/firebase";
import Link from "next/link";
import Loader from "@/components/common/Loader";
// import { StudentCourse } from "@/components/Enum/StudentCourse";

enum Gender {
  Male,
  Female,
  Other,
}

enum MaritalStatus {
  Married,
  Unmarried,
}
enum StudentCourse {
  MBA,
  MCA,
  MTech,
  BTech,
  BBA,
  BCA,
  BCom,
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  rollNo: string;
  dob: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  address: string;
  city: string;
  state: string;
  joiningDate: string;
  graduationDate: string;
  course: StudentCourse;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  rollNo: "",
  dob: "",
  gender: Gender.Male,
  maritalStatus: MaritalStatus.Married,
  address: "",
  city: "",
  state: "",
  joiningDate: "",
  graduationDate: "",
  course: StudentCourse.MCA,
};

const Students: React.FC = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const config = {
    cUrl: "https://api.countrystatecity.in/v1/countries",
    ckey: "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
  };

  const countryCode = "IN";

  const loadStates = () => {
    fetch(`${config.cUrl}/${countryCode}/states`, {
      headers: { "X-CSCAPI-KEY": config.ckey },
    })
      .then((response) => response.json())
      .then((data) => {
        setStates(data);
      })
      .catch((error) => console.error("Error loading states:", error));
  };

  const loadCities = (selectedStateCode: string) => {
    // values.state =
    console.log("State code :", selectedStateCode);
    fetch(`${config.cUrl}/${countryCode}/states/${selectedStateCode}/cities`, {
      headers: { "X-CSCAPI-KEY": config.ckey },
    })
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      })
      .catch((error) => console.error("Error loading cities:", error));
  };

  useEffect(() => {
    loadStates();
  }, []);
  var formData = new FormData();
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
    validationSchema: studentSchema,
    onSubmit: async (values, { resetForm }) => {
      values.course = values.course;
      Object.entries(values).forEach(([key, value]) => {
        // Convert enum values to numbers if necessary
        if (typeof value === "number" && !isNaN(value)) {
          formData.append(key, value.toString()); // Convert number to string
        } else {
          formData.append(key, value);
        }
      });
      console.log("form values", formData);
      setIsLoading(true)
      const response = await dispatch(addStudent(formData));
      console.log(response);
      if (response.payload?.success) {
        ToastSuccess(response.payload?.message);
        route.push("student-table");
      } else if (response.error?.message) {
        ToastError(response.error.message || "An error occurred.");
      }
      setIsLoading(false)
    },
  });

  // validation for string
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { name } = e.target;
    const regex = /^[a-zA-Z\s]*$/; // Regex to allow only letters and spaces
    if (regex.test(value) || value === "") {
      setFieldValue(name, value);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const newfile = e.target.files?.[0];
    const allowedExtensions = ["xlsx", "xls", "csv"];
    const fileExtension = newfile.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowedExtensions.includes(fileExtension)) {
      ToastError("Please select a valid Excel file: XLSX, XLS, or CSV.");
      return;
    }
    setFile(e.target.files[0]);
    console.log("file set" + file);
  };

  useEffect(() => {
    if (file && file.type === "application/pdf") {
      const tempURL = URL.createObjectURL(file);
      setPdfPreview(tempURL);
    }
  }, [file]);

  //function to upload an image in firebase
  const uploadFile = async () => {
    if (file == null) {
      ToastError("Please select file");
      return;
    }
    const allowedExtensions = ["xlsx", "xls", "csv"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowedExtensions.includes(fileExtension)) {
      ToastError("Invalid file type. Only .xlsx files are allowed.");
      return;
    }
    const randomId = Math.random().toString(36).substring(2);
    const imagePath = `ExcelFile/${randomId}.${fileExtension}`;
    const imageRef = ref(storage, imagePath);
    try {
      await uploadBytes(imageRef, file);
      console.log("File uploaded");
      const downloadURL = await getDownloadURL(imageRef);
      if (downloadURL != null) {
        console.log("File URL:", downloadURL);
        setFileUrl(downloadURL);
        ToastSuccess("File Uploaded successfully.");
      }
    } catch (error) {
      console.error("Error uploading .xlsx:", error);
      ToastError("Failed to Uploaded .xlsx");
      return null;
    }
  };

  // import data using excel file
  const impostExcel = async () => {
    const formData = new FormData();
    formData.append("fileUrl", fileUrl); // Append fileUrl to the formData
    var response = await dispatch(importExcelFile(formData));
    console.log(response);
    if (response.payload?.success) {
      ToastSuccess(response.payload?.message);
      route.push("student-table");
    } else if (response.error?.message) {
      ToastError(response.error.message || "An error occurred.");
    }
  };

  useEffect(() => {
    if (fileUrl) {
      impostExcel();
    }
  }, [fileUrl]);

  return (
    <>
    {isLoading && <Loader/>}
      <DefaultLayout>
        <Breadcrumb pageName="Student Registration" />
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <div className="flex space-x-2 items-center">
                <label htmlFor="fileInput" className="cursor-pointer">
                  <span className="bg-success font-medium gap-2.5 hover:bg-opacity-90 inline-flex items-center px-2 py-2 text-white">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-4m5-13v4a1 1 0 0 1-1 1H5m0 6h9m0 0-2-2m2 2-2 2"
                      />
                    </svg>
                    Import
                  </span>
                </label>
                <p>{file?.name ?? ".csv | .xlsx | .xls"}</p>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={onFileChange}
                />
                {pdfPreview && (
                  <Link href={pdfPreview} target="blanck">
                    <button
                      type="button"
                      className="bg-success font-medium hover:bg-opacity-90 p-3 rounded text-gray"
                    >
                      Preview
                    </button>
                  </Link>
                )}
                <button
                  className="bg-success font-medium gap-2.5 hover:bg-opacity-90 inline-flex items-center px-2 py-2 text-white"
                  onClick={uploadFile}
                >
                  Upload
                </button>
              </div>
              <Displaybutton path="./student-table" text="All Students" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      First name
                      <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter student's First Name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="firstName"
                      id="firstName"
                      value={values.firstName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName ? (
                      <p className="text-red">{errors.firstName}</p>
                    ) : null}
                  </div>

                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Last name<span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter student's Last Name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="lastName"
                      id="lastName"
                      value={values.lastName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastName && touched.lastName ? (
                      <p className="text-red">{errors.lastName}</p>
                    ) : null}
                  </div>
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Email<span className="text-red">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter student's Email"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="email"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="new-email"
                    />
                    {errors.email && touched.email ? (
                      <p className="text-red">{errors.email}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Phone Number<span className="text-red">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Enter student Phone Nummber"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <p className="text-red">{errors.phoneNumber}</p>
                    ) : null}
                  </div>
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Password<span className="text-red">*</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter student's Password"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="new-password"
                    />
                    {errors.password && touched.password ? (
                      <p className="text-red">{errors.password}</p>
                    ) : null}
                  </div>

                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Confirm Password<span className="text-red">*</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter student's Confirm Password"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <p className="text-red">{errors.confirmPassword}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Roll No<span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter student's Roll No"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="rollNo"
                      id="rollNo"
                      value={values.rollNo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.rollNo && touched.rollNo ? (
                      <p className="text-red">{errors.rollNo}</p>
                    ) : null}
                  </div>
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Date Of Birth<span className="text-red">*</span>
                    </label>
                    <input
                      type="date"
                      placeholder="Enter student's Dob formate:'yyyy-mm-dd'"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="dob"
                      id="dob"
                      value={values.dob}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.dob && touched.dob ? (
                      <p className="text-red">{errors.dob.toString()}</p>
                    ) : null}
                  </div>

                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Gender<span className="text-red">*</span>
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="gender"
                      id="gender"
                      value={values.gender}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value={Gender.Male}>Male</option>
                      <option value={Gender.Female}>Female</option>
                      <option value={Gender.Other}>Other</option>
                    </select>
                    {errors.gender && touched.gender ? (
                      <p className="text-red">{errors.gender}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Marital Status<span className="text-red">*</span>
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="maritalStatus"
                      id="maritalStatus"
                      value={values.maritalStatus}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select Marital Status
                      </option>
                      <option value="0">Married</option>
                      <option value="1">Unmarried</option>
                    </select>
                    {errors.maritalStatus && touched.maritalStatus ? (
                      <p className="text-red">{errors.maritalStatus}</p>
                    ) : null}
                  </div>
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      State<span className="text-red">*</span>
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="state"
                      id="state"
                      value={values.state}
                      onChange={(e) => {
                        handleChange(e);
                        loadCities(e.target.selectedOptions[0].id);
                      }}
                    >
                      <option value="" disabled>
                        Select State
                      </option>
                      {states.map((state: any) => (
                        <option
                          key={state.name}
                          value={state.name}
                          id={state.iso2}
                        >
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {errors.state && touched.state ? (
                      <p className="text-red">{errors.state}</p>
                    ) : null}
                  </div>

                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      City<span className="text-red">*</span>
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="city"
                      id="city"
                      value={values.city}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select City
                      </option>
                      {cities.map((city: any) => (
                        <option
                          key={city.name}
                          value={city.name}
                          id={city.iso2}
                        >
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {errors.city && touched.city ? (
                      <p className="text-red">{errors.city}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Address<span className="text-red">*</span>
                    </label>
                    <textarea
                      placeholder="Enter student's Address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="address"
                      id="address"
                      rows={1}
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                    {errors.address && touched.address ? (
                      <p className="text-red">{errors.address}</p>
                    ) : null}
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Course<span className="text-red">*</span>
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="course"
                      id="course"
                      value={values.course}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select Course
                      </option>
                      {Object.keys(StudentCourse)
                        .filter((key) =>
                          isNaN(
                            Number(
                              StudentCourse[key as keyof typeof StudentCourse]
                            )
                          )
                        )
                        .map((key, index) => (
                          <option key={key} value={index}>
                            {StudentCourse[key as keyof typeof StudentCourse]}
                          </option>
                        ))}
                    </select>
                    {errors.course && touched.course ? (
                      <p className="text-red">{errors.course}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Joining Date<span className="text-red">*</span>
                    </label>
                    <input
                      type="date"
                      placeholder="Enter student's Joining Date formate:'yyyy-mm-dd'"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="joiningDate"
                      id="joiningDate"
                      value={values.joiningDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.joiningDate && touched.joiningDate ? (
                      <p className="text-red">{errors.joiningDate}</p>
                    ) : null}
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Graduation Date<span className="text-red">*</span>
                    </label>
                    <input
                      type="date"
                      placeholder="Enter student's Graduation Date formate:'yyyy-mm-dd'"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="graduationDate"
                      id="graduationDate"
                      value={values.graduationDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.graduationDate && touched.graduationDate ? (
                      <p className="text-red">
                        {errors.graduationDate.toString()}
                      </p>
                    ) : null}
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Students;
