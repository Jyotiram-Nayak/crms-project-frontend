"use client"
import { ToastError, ToastSuccess } from '@/components/ToastMessage/ToastMessage'
import { changePassword, forgotPassword } from '@/lib/UserSlice/UserSlice'
import { forgotPasswordSchema } from '@/schema'
import { useFormik } from 'formik'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'

interface FormValue {
    email: string
}

const initialValues: FormValue = {
    email: ""
}

const page = () => {
    const dispatch = useDispatch()
    const { values, errors, touched, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: forgotPasswordSchema,
        onSubmit: async (values: FormValue, { resetForm }) => {
            console.log("form values", values);
            const response = await dispatch(forgotPassword(values.email));
            console.log(response);
            if (response.payload?.success) {
                ToastSuccess(response.payload?.message);
                resetForm();
            } else if (response.error?.message) {
                ToastError(response.error.message || "An error occurred.");
            }
        },
    });
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div style={{ minWidth: "50%" }}>
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Forgot Password
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Email<span className="text-red">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type='email'
                                            placeholder="Enter Email address"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            name="email"
                                            id="email"
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && touched.email ? (
                                            <p className="text-red">{errors.email}</p>
                                        ) : null}
                                    </div>
                                </div>
                                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Send Email
                                </button>
                                <div className="mt-6 text-center">
                                    <p>
                                        Back to Login page{" "}
                                        <Link href="/auth/signin" className="text-primary">
                                            Sign In
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page