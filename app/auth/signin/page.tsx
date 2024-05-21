"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import { loginSchema } from "@/schema";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { userLogin } from "@/lib/UserSlice/UserSlice";
import {
  ToastError,
  ToastSuccess,
} from "@/components/ToastMessage/ToastMessage";
import { getCookie } from "cookies-next";

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};
const page: React.FC = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  const token = getCookie("token");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  useEffect(() => {
    if (token) {
      route.push("/dashboard");
    }
  }, [token]);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik<FormValues>({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values: FormValues) => {
        console.log("Form values", values);
        const response = await dispatch(userLogin(values));
        console.log("Response :", response);

        if (response.payload?.success) {
          ToastSuccess(response.payload?.message);
          route.push("/");
        } else if (response.error?.message) {
          ToastError(response.error?.message || "An error occurred.");
        }
      },
    });

  return (
    <>
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
                Welcome back to Career Forge! Whether you're a student,
                university representative, or company professional, Career Forge
                is your gateway to success. Log in now to access exclusive
                features.
              </p>
              <Image
                src="/images/login_animation.gif"
                alt="Login GIF"
                width={500}
                height={500}
                style={{ width: "500px", height: "500px" }}
              />
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 h-screen">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <div className="flex justify-center">
                <Image
                  className="dark:hidden"
                  src={"/logo-png/logo-black.png"}
                  alt="Logo"
                  width={140}
                  height={32}
                />
              </div>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">
                Login to CareerForge
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email<span className="text-red">*</span>
                  </label>
                  <div className="relative">
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

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password<span className="text-red">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Enter your password"
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
                <div className="mb-5.5 mt-5 flex items-center justify-end">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forget password?
                  </Link>
                </div>
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Login"
                    className="w-full cursor-pointer rounded border border-graydark bg-graydark p-3 text-white transition hover:bg-opacity-90"
                  />
                </div>
                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{" "}
                    <Link href="./signup" className="text-primary">
                      Create account
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
