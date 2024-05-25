"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import { signUpSchema } from "@/schema";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userRegister } from "@/lib/UserSlice/UserSlice";
import {
  ToastError,
  ToastSuccess,
} from "@/components/ToastMessage/ToastMessage";
import { ToastContainer } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/firebase";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";

interface SignUpValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  address: string;
  city: string;
  state: string;
  website?: string;
  bio?: string;
  image?: string;
  role: string;
}

const initialValues: SignUpValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  address: "",
  city: "",
  state: "",
  website: undefined,
  bio: undefined,
  image: undefined,
  role: "",
};

const page: React.FC = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
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

  const token = getCookie("token");
  if (token) {
    route.replace("/");
  }
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  // Prevent pasting
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  // When the file is selected, set the file state
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
    console.log("file set" + file);
  };
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  };

  //function to upload an image in firebase
  const uploadImage = async () => {
    if (file == null) return;
    const randomId = Math.random().toString(36).substring(2);
    const fileExtension = file.name.split(".").pop();
    const imagePath = `image/${randomId}.${fileExtension}`;
    const imageRef = ref(storage, imagePath);
    try {
      await uploadBytes(imageRef, file);
      console.log("imgae uploaded");
      const downloadURL = await getDownloadURL(imageRef);
      values.image = downloadURL;
      console.log("Image URL:", downloadURL);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik<SignUpValues>({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values: SignUpValues, { resetForm }) => {
      console.log("form values", values);
      setIsLoading(true);
      values.phoneNumber = values.phoneNumber.toString();
      await uploadImage();
      const response = await dispatch(userRegister(values));
      console.log(response);

      if (response.payload?.success) {
        ToastSuccess(response.payload?.message);
        route.replace("/auth/signin");
      } else if (response.error?.message) {
        ToastError(response.error?.message || "An error occurred.");
      }
      setIsLoading(false);
    },
  });
  console.log(errors);

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
    {isLoading && <Loader/>}
      <ToastContainer />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap">
          <div
            className="hidden w-full xl:block xl:w-1/2 bg-graydark"
            style={{ padding: "10% 0" }}
          >
            <div className="text-center p-4 flex flex-col items-center">
              <Link className="mb-5.5 inline-block" href="/">
                <Image
                  className="dark:hidden"
                  src={"/logo-png/logo-white-transparent.png"}
                  alt="Logo"
                  width={270}
                  height={100}
                />
              </Link>
              <p className="2xl:px-20 text-xl text-white">
                Welcome to Career Forge Registration! Career Forge is the
                ultimate platform for universities and companies to connect with
                talented students and professionals. If you're a university or
                company representative looking to join our network, you're in
                the right place!
              </p>
              <Image
                src="/images/register.png"
                alt="Register"
                width={500}
                height={500}
                style={{ width: "500px", height: "500px" }}
              />
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">
                Sign Up to CareerForge
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2">
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      First Name<span className="text-red">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your first name"
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
                  </div>

                  <div className="ms-2 mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Last Name<span className="text-red">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter your last name"
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
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Email<span className="text-red">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter your Email"
                        autoComplete="new email"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email ? (
                        <p className="text-red">{errors.email}</p>
                      ) : null}
                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="ms-2 mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Phone Number<span className="text-red">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter your Phone Number"
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
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password<span className="text-red">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter your Password"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        autoComplete="new password"
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onPaste={handlePaste}
                      />
                      {errors.password && touched.password ? (
                        <p className="text-red">{errors.password}</p>
                      ) : null}
                      <span
                        className="absolute right-4 top-4"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? (
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
                              strokeWidth="2"
                              d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                            />
                            <path
                              stroke="currentColor"
                              strokeWidth="2"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        ) : (
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
                              d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="ms-2 mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Confirm Password<span className="text-red">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Re-enter your password"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onPaste={handlePaste}
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <p className="text-red">{errors.confirmPassword}</p>
                      ) : null}
                      <span className="absolute right-4 top-4">
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.5">
                            <path
                              d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                              fill=""
                            />
                            <path
                              d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      State<span className="text-red">*</span>
                    </label>
                    <div className="relative">
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
                  </div>
                  <div className="ms-2 mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      City<span className="text-red">*</span>
                    </label>
                    <div className="relative">
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
                </div>

                <div className="grid grid-cols-2">
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Address<span className="text-red">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        // type="text"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter your Address"
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
                      <span className="absolute right-4 top-4">
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="ms-2 mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Website<span className="text-red">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter your Website Url"
                        name="website"
                        id="website"
                        value={values.website}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.website && touched.website ? (
                        <p className="text-red">{errors.website}</p>
                      ) : null}
                      <span className="absolute right-4 top-4">
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
                            strokeWidth="2"
                            d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="ms-2 mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      placeholder="Plese select an Image"
                      name="file"
                      id="file"
                      onChange={onFileChange}
                      onClick={onClick}
                    />
                    {errors.image && touched.image ? (
                      <p className="text-red">{errors.image}</p>
                    ) : null}
                    <span className="absolute right-4 top-4">
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
                          d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="ms-2 mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Role<span className="text-red">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      name="role"
                      id="role"
                      value={values.role}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      <option value="university">University/College</option>
                      <option value="company">Company</option>
                    </select>
                    {errors.role && touched.role ? (
                      <p className="text-red">{errors.role}</p>
                    ) : null}
                    <span className="absolute right-4 top-4">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer rounded border border-graydark bg-graydark p-3 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{" "}
                    <Link href="./signin" className="text-primary">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
