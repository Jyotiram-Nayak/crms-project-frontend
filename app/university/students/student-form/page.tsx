"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";
import { useFormik } from "formik";
import DatePicker from "@/components/FormElements/DatePicker";
import Displaybutton from "@/components/FormElements/buttons/Displaybutton";
import { useDispatch } from "react-redux";
import { addStudent } from "@/lib/StudentSlice/StudentSlice";
import { studentSchema } from "@/schema";

// interface FormValues {
//   FirstName: string;
//   LastName: string;
//   Email: string;
//   Password: string;
//   ConfirmPassword: string;
//   RollNo: string;
//   Dob: string;
//   Gender: number;
//   MaritalStatus: number;
//   Address: string;
//   JoiningDate: string;
//   GraduationDate: string;
// }

const initialValues = {
  FirstName: "",
  LastName: "",
  Email: "",
  Password: "",
  ConfirmPassword: "",
  RollNo: "",
  Dob: "",
  Gender: 0,
  MaritalStatus: 0,
  Address: "",
  JoiningDate: "",
  GraduationDate: "",
};

const Students: React.FC = () => {
  
  const dispatch = useDispatch();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: studentSchema,
      onSubmit: async (values, { resetForm }) => {
        console.log("form values", values);
        dispatch(addStudent(values));
        resetForm();
      },
    });
  console.log(errors);
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Student Registration" />
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Student Registration
              </h3>
              <Displaybutton path="./student-table" text="All Students" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      First name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your First Name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="FirstName"
                      id="FirstName"
                      value={values.FirstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.FirstName && touched.FirstName ? (
                      <p className="text-red">{errors.FirstName}</p>
                    ) : null}
                  </div>

                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Last name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Last Name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="LastName"
                      id="LastName"
                      value={values.LastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.LastName && touched.LastName ? (
                      <p className="text-red">{errors.LastName}</p>
                    ) : null}
                  </div>
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your Email"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="Email"
                      id="Email"
                      value={values.Email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.Email && touched.Email ? (
                      <p className="text-red">{errors.Email}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your Password"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="Password"
                      id="Password"
                      value={values.Password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.Password && touched.Password ? (
                      <p className="text-red">{errors.Password}</p>
                    ) : null}
                  </div>

                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your Confirm Password"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="ConfirmPassword"
                      id="ConfirmPassword"
                      value={values.ConfirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.ConfirmPassword && touched.ConfirmPassword ? (
                      <p className="text-red">{errors.ConfirmPassword}</p>
                    ) : null}
                  </div>
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Roll No
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Roll No"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="RollNo"
                      id="RollNo"
                      value={values.RollNo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.RollNo && touched.RollNo ? (
                      <p className="text-red">{errors.RollNo}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Date Of Birth
                    </label>
                    <input
                      className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="mm/dd/yyyy"
                      data-class="flatpickr-right"
                      id="Dob"
                      name="Dob"
                      value={values.Dob}
                      onChange={handleChange}
                    />
                    {errors.Dob && touched.Dob ? (
                      <p className="text-red">{errors.Dob.toString()}</p>
                    ) : null}
                  </div>

                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Gender
                    </label>
                    <select
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="Gender"
                      id="Gender"
                      value={values.Gender}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.Gender && touched.Gender ? (
                      <p className="text-red">{errors.Gender}</p>
                    ) : null}
                  </div>
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Marital Status
                    </label>
                    <select
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="MaritalStatus"
                      id="MaritalStatus"
                      value={values.MaritalStatus}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select Marital Status
                      </option>
                      <option value="Married">Married</option>
                      <option value="Unmarried">Unmarried</option>
                    </select>
                    {errors.MaritalStatus && touched.MaritalStatus ? (
                      <p className="text-red">{errors.MaritalStatus}</p>
                    ) : null}
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="Address"
                      id="Address"
                      value={values.Address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.Address && touched.Address ? (
                      <p className="text-red">{errors.Address}</p>
                    ) : null}
                  </div>

                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Joining Date
                    </label>
                    <input
                      className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="mm/dd/yyyy"
                      data-class="flatpickr-right"
                      id="JoiningDate"
                      name="JoiningDate"
                      value={values.JoiningDate}
                      onChange={handleChange}
                    />
                    {errors.Dob && touched.Dob ? (
                      <p className="text-red">{errors.Dob.toString()}</p>
                    ) : null}
                  </div>
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Graduation Date
                    </label>
                    <input
                      className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="mm/dd/yyyy"
                      data-class="flatpickr-right"
                      id="GraduationDate"
                      name="GraduationDate"
                      value={values.GraduationDate}
                      onChange={handleChange}
                    />
                    {errors.Dob && touched.Dob ? (
                      <p className="text-red">{errors.Dob.toString()}</p>
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
