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

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  rollNo: string;
  dob: string;
  gender: number;
  maritalStatus: number;
  address: string;
  joiningDate: string;
  graduationDate: string;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  rollNo: "",
  dob: "",
  gender: 0,
  maritalStatus: 0,
  address: "",
  joiningDate: "",
  graduationDate: "",
};


const Students: React.FC = () => {
  
  const dispatch = useDispatch();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: studentSchema,
      onSubmit: async (values, { resetForm }) => {
        console.log("form values", values);
        const response =await dispatch(addStudent(values));
        console.log(response)
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
                      name="firstName"
                      id="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName ? (
                      <p className="text-red">{errors.firstName}</p>
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
                      name="lastName"
                      id="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.lastName && touched.lastName ? (
                      <p className="text-red">{errors.lastName}</p>
                    ) : null}
                  </div>
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="email"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="text-red">{errors.email}</p>
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
                      name="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? (
                      <p className="text-red">{errors.password}</p>
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
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Roll No
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Roll No"
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
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Date Of Birth
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Dob formate:'yyyy-mm-dd'"
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
                      Gender
                    </label>
                    <select
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="Gender"
                      id="Gender"
                      value={values.gender}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="0">Male</option>
                      <option value="1">Female</option>
                      <option value="2">Other</option>
                    </select>
                    {errors.gender && touched.gender ? (
                      <p className="text-red">{errors.gender}</p>
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
                      name="address"
                      id="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.address && touched.address ? (
                      <p className="text-red">{errors.address}</p>
                    ) : null}
                  </div>

                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Joining Date
                    </label>
                    {/* <input
                      className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="mm/dd/yyyy"
                      data-class="flatpickr-right"
                      id="joiningDate"
                      name="joiningDate"
                      value={values.joiningDate ? values.joiningDate.toISOString().substr(0, 10) : ''}
                      onChange={handleChange}
                    /> */}
                    <input
                      type="text"
                      placeholder="Enter your Joining Date formate:'yyyy-mm-dd'"
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
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Graduation Date
                    </label>
                    {/* <input
                      className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="mm/dd/yyyy"
                      data-class="flatpickr-right"
                      id="graduationDate"
                      name="graduationDate"
                      value={values.graduationDate ? values.graduationDate.toISOString().substr(0, 10) : ''}
                      onChange={handleChange}
                    /> */}
                    <input
                      type="text"
                      placeholder="Enter your Graduation Date formate:'yyyy-mm-dd'"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="graduationDate"
                      id="graduationDate"
                      value={values.graduationDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.graduationDate && touched.graduationDate ? (
                      <p className="text-red">{errors.graduationDate.toString()}</p>
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
