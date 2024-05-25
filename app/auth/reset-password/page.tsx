"use client"
import { ToastError, ToastSuccess } from '@/components/ToastMessage/ToastMessage'
import { resetPassword } from '@/lib/UserSlice/UserSlice'
import { resetPasswordSchema } from '@/schema'
import { useFormik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

interface FormValues {
    newPassword: string,
    confirmPassword: string,
}

const initialValues: FormValues = {
    newPassword: "",
    confirmPassword: "",
}

const page = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const dispatch = useDispatch()
    const route = useRouter()
    const searchParams = useSearchParams();

    // Extract uid and token from the URL
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');
    console.log("uid : " ,uid)
    console.log("token : " ,token)

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    // Prevent pasting
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    const { values, errors, touched, handleChange, handleSubmit} = useFormik({
        initialValues: initialValues,
        validationSchema: resetPasswordSchema,
        onSubmit: async (values) => {
            if (!uid || !token) {
                ToastError("Invalid reset link.");
                return;
            }
            console.log("form values", values);
            const response = await dispatch(resetPassword({...values,uid,token}));
            console.log(response);

            if (response.payload?.success) {
                ToastSuccess(response.payload?.message);
                route.replace("/profile");
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
                                Reset Password
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        New Password<span className="text-red">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={passwordVisible ? 'text' : 'password'}
                                            placeholder="Enter your new Password"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            name="newPassword"
                                            id="newPassword"
                                            value={values.newPassword}
                                            onChange={handleChange}
                                            onPaste={handlePaste}
                                        />
                                        {errors.newPassword && touched.newPassword ? (
                                            <p className="text-red">{errors.newPassword}</p>
                                        ) : null}
                                        <span className="absolute right-4 top-4"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {passwordVisible ?
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                                :
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            }
                                        </span>
                                    </div>
                                </div>

                                <div className='mb-4.5'>
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Confirm Password<span className="text-red">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onPaste={handlePaste}
                                    />
                                    {errors.confirmPassword && touched.confirmPassword ? (
                                        <p className="text-red">{errors.confirmPassword}</p>
                                    ) : null}
                                </div>

                                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page