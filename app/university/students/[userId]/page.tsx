"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Displaybutton from "@/components/FormElements/buttons/Displaybutton";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent } from "@/lib/StudentSlice/StudentSlice";
import {
  ToastError,
  ToastSuccess,
} from "@/components/ToastMessage/ToastMessage";
import { updateStudentSchema } from "@/schema";
import { DateFilter } from "@/components/Filters/DataFilter/DataFilter";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";

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
  maritalStatus: MaritalStatus.Unmarried,
  address: "",
  city: "",
  state: "",
  joiningDate: "",
  graduationDate: "",
  course: StudentCourse.MCA,
};

export default function Page({ params }: { params: { userId: string } }) {
  const dispatch = useDispatch();
  const [student, setStudent] = useState<FormValues | null>(null);
  const state = useSelector((state: any) => state.student);
  const route = useRouter();
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
        fetchData(data);
      })
      .catch((error) => console.error("Error loading states:", error));
  };

  const loadCities = (selectedStateCode: string) => {
    fetch(`${config.cUrl}/${countryCode}/states/${selectedStateCode}/cities`, {
      headers: { "X-CSCAPI-KEY": config.ckey },
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredCities = data.filter((city:any) => city.name !== "Amod" && city.name !== "Nadiad");
        setCities(filteredCities);
      })
      .catch((error) => console.error("Error loading cities:", error));
  };

  // const studentData = Object.values(state.student);
  const studentData = state.student;

  const fetchData = async (statesList: any[]) => {
    const singleStudent = studentData.find(
      (student: any) => student.userId === params.userId
    );
    if (singleStudent != null) {
      setStudent(singleStudent);
    }
    const stateDetail = statesList.find(
      (state: any) => state.name === singleStudent.state
    );
    if (stateDetail && stateDetail.iso2) {
      loadCities(stateDetail.iso2);
    }
  };

  useEffect(() => {
    loadStates();
  }, []);

  useEffect(() => {
    if (student) {
      setValues({
        firstName: student?.firstName || "",
        lastName: student?.lastName || "",
        email: student?.email || "",
        phoneNumber: student?.phoneNumber || "",
        address: student?.address || "",
        password: student?.password || "",
        confirmPassword: student?.confirmPassword || "",
        city: student?.city || "",
        state: student?.state || "",
        rollNo: student?.rollNo || "",
        dob: student?.dob || "",
        gender: student?.gender || 0,
        maritalStatus: student?.maritalStatus || 0,
        joiningDate: student?.joiningDate || "",
        graduationDate: student?.graduationDate || "",
        course: student?.course || 0,
      });
    }
  }, [student]);

  var formData = new FormData();
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: updateStudentSchema,
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
      const studentId = params.userId;
      setIsLoading(true);
      const response = await dispatch(
        updateStudent({ studentId: studentId, val: formData })
      );
      console.log("response",response)
      if (response.payload?.success) {
        ToastSuccess(response.payload?.message);
        route.replace("student-table");
      } else if (response.error?.message) {
        ToastError(response.error?.message || "An error occurred.");
        console.log(response.error?.message || "An error occurred.")
      }
      setIsLoading(false);
    },
  });

  const cancelUpdate = () => {
    route.replace("student-table");
  };

  // validation for string
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { name } = e.target;
    const regex = /^[a-zA-Z\s]*$/; // Regex to allow only letters and spaces
    if (regex.test(value) || value === "") {
      setFieldValue(name, value);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
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
                      First name <span className="text-red">*</span>
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
                      Last name <span className="text-red">*</span>
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
                      Email <span className="text-red">*</span>
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
                      autoComplete="new email"
                    />
                    {errors.email && touched.email ? (
                      <p className="text-red">{errors.email}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Phone Number <span className="text-red">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter student Phone Nummber"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      minLength={10}
                      maxLength={10}
                      pattern="\d{10}"
                      title="Please enter a valid 10-digit phone number"
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <p className="text-red">{errors.phoneNumber}</p>
                    ) : null}
                  </div>
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter student's Password"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="password"
                      id="password"
                      value={values.password ?? ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="new password"
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
                      Roll No <span className="text-red">*</span>
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
                      Date Of Birth <span className="text-red">*</span>
                    </label>
                    <input
                      type="date"
                      placeholder="Enter student's Dob formate:'yyyy-mm-dd'"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="dob"
                      id="dob"
                      value={DateFilter(values.dob)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.dob && touched.dob ? (
                      <p className="text-red">{errors.dob.toString()}</p>
                    ) : null}
                  </div>

                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Gender <span className="text-red">*</span>
                    </label>
                    <select
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="gender"
                      id="gender"
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
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/3">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Marital Status <span className="text-red">*</span>
                    </label>
                    <select
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                      State <span className="text-red">*</span>
                    </label>
                    <select
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                      City <span className="text-red">*</span>
                    </label>
                    <select
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="city"
                      id="city"
                      value={values.city}
                      onChange={(e) => handleChange(e)}
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
                      Address <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter student's Address"
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
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Course<span className="text-red">*</span>
                    </label>
                    <select
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="course"
                      id="course"
                      value={StudentCourse[values.course]}
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
                        .map((key) => (
                          <option
                            key={key}
                            value={
                              StudentCourse[key as keyof typeof StudentCourse]
                            }
                          >
                            {StudentCourse[key as keyof typeof StudentCourse]}
                          </option>
                        ))}
                    </select>
                    {errors.address && touched.address ? (
                      <p className="text-red">{errors.address}</p>
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
                      value={DateFilter(values.joiningDate)}
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
                      value={DateFilter(values.graduationDate)}
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

                <div className="grid grid-cols-2 space-x-2">
                  <button
                    onClick={cancelUpdate}
                    type="button"
                    className="flex w-full justify-center rounded bg-danger p-3 font-medium text-gray hover:bg-opacity-90"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  >
                    Update Student
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
