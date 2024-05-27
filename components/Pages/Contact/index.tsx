"use client";
import {
  ToastError,
  ToastSuccess,
} from "@/components/ToastMessage/ToastMessage";
import Loader from "@/components/common/Loader";
import { contactUsMail } from "@/lib/UserSlice/UserSlice";
import { contactUsSchema } from "@/schema";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: null,
  message: "",
};

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: contactUsSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Form values", values);
        setIsLoading(true);
        const response = await dispatch(contactUsMail(values));
        if (response.payload?.success) {
          ToastSuccess(response.data?.message);
        } else if (response.error?.message) {
          ToastError(response.error?.message);
        }
      } catch (error) {
        setIsLoading(false);
      }
      setIsLoading(false);
      resetForm();
    },
  });
  console.log(errors);

  return (
    <>
      {isLoading ?? <Loader />}
      <section
        className="relative w-full flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/cover/technology-image.png')",
          height: "40rem",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute bottom-0 w-full transform rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
          >
            <path
              className="fill-current text-gray dark:text-black"
              d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7 c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4 c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
            ></path>
          </svg>
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="flex flex-col items-center">
            <div className="w-full text-center">
              <section className="box-border h-auto w-full">
                <div className="container mx-auto">
                  <div className="w-full">
                    <div className="py-4">
                      <div className="widget-heading">
                        <div>
                          <h2 className="text-4xl font-bold text-white mb-4">
                            Welcome to CareerForge
                          </h2>
                        </div>
                      </div>
                      <div className="widget-heading">
                        <div>
                          <h2 className="text-4xl font-bold text-white">
                            Building Careers, Shaping Futures
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <div className="m-20 flex flex-wrap justify-center">
        <div className="max-w-2xl p-6 bg-gray-100 rounded-lg">
          <p className="text-4xl font-bold mb-4">Contact us for more info</p>
          <p className="text-gray-700 mb-4">
            Have a question, comment, or just want to say hello? We’d love to
            hear from you. Fill out the form, and Our team will get back to you
            as soon as possible.
          </p>
          <p className="text-gray-700 mb-4">
            406 Luxuria Business Hub, Near VR mall, Surat - Dumas Rd, Surat,
            Gujarat 395007
          </p>
          <p className="text-gray-700 mb-4 text-2xl"><strong>info@careerforge.in</strong></p>
          <p className="text-gray-700 mb-4 text-2xl">
            <strong>+91-8255006150, +91-7445890536</strong>
          </p>
        </div>
        <div className="flex flex-col gap-9" style={{ width: "35rem" }}>
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white text-3xl">
                Write to us!
              </h3>
              <p>
                <strong>
                  Need any help, just write us here and we will get back to you
                  within 24 hours
                </strong>
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="grid grid-cols-2 space-x-2">
                  <div className="mb-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      First Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your FirstName"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      id="firstName"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                    />{" "}
                    {errors.firstName && touched.firstName ? (
                      <p className="text-red">{errors.firstName}</p>
                    ) : null}
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Last Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your email address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      id="lastName"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                    />{" "}
                    {errors.lastName && touched.lastName ? (
                      <p className="text-red">{errors.lastName}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />{" "}
                  {errors.email && touched.email ? (
                    <p className="text-red">{errors.email}</p>
                  ) : null}
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Contact No. <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Select subject"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    id="contact"
                    name="contact"
                    minLength={10}
                    maxLength={10}
                    pattern="\d{10}"
                    value={values.contact ?? ""}
                    title="Please enter a valid 10-digit phone number"
                    onChange={handleChange}
                  />{" "}
                  {errors.contact && touched.contact ? (
                    <p className="text-red">{errors.contact}</p>
                  ) : null}
                </div>
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Message <span className="text-meta-1">*</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    id="message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                  ></textarea>{" "}
                  {errors.message && touched.message ? (
                    <p className="text-red">{errors.message}</p>
                  ) : null}
                </div>

                <button className="flex w-full justify-center rounded bg-black p-3 font-medium text-gray hover:bg-opacity-90">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
