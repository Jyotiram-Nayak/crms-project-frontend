"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DateFilter } from "@/components/Filters/DateFilter/DateFilter";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ToastError, ToastSuccess } from "@/components/ToastMessage/ToastMessage";
import { storage } from "@/firebase/firebase";
import { addJobApplication } from "@/lib/JobApplicationSlice/JobApplicationSlice";
import { addJob } from "@/lib/JobSlice/JobSlice";
import { jobApplicationSchema } from "@/schema";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface User {
    jobId: string;
    address: string;
    approvedDate: string;
    bio: string;
    city: string;
    companyId: string;
    createOn: string;
    deadline: string;
    description: string;
    document: string;
    email: string;
    firstName: string;
    id: string;
    image: string | null;
    isApproved: boolean;
    lastName: string;
    phoneNumber: string;
    postedDate: string;
    rejectedDate: string;
    role: string;
    state: string;
    status: number;
    title: string;
    universityId: string;
    updateOn: string | null;
    website: string;
}

interface JobApplication {
    jobId: string,
    resume: string,
}

const initialValues: JobApplication = {
    jobId: "",
    resume: "",
}
export default function Page({ params }: { params: { jobid: string } }) {
    const [job, setJob] = useState<User | null>(null)
    const [file, setFile] = useState<File | null>(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const state = useSelector((state: any) => state.job)
    const jobData = state.job;
    console.log("job data :", jobData);

    const fetchData = async () => {
        const singleJob = jobData.find(
            (job: any) => job.jobId === params.jobid
        );
        console.log("get from selector :", singleJob);
        if (singleJob != null) {
            setJob(singleJob);
        }
    };
    // when page load first time, fetch data from redux
    useEffect(() => {
        fetchData();
    }, []);

    // When the file is selected, set the file state
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        setFile(e.target.files[0]);
        console.log("file set" + file);
    };

    const cancelApply = () => {
        router.back();
    };
    //function to upload an image in firebase
    const uploadPdf = async () => {
        if (file == null) return;
        const randomId = Math.random().toString(36).substring(2);
        const fileExtension = file.name.split(".").pop();
        const imagePath = `resume/${randomId}.${fileExtension}`;
        const imageRef = ref(storage, imagePath);
        try {
            await uploadBytes(imageRef, file);
            console.log("resume uploaded");
            const downloadURL = await getDownloadURL(imageRef);
            if (downloadURL != null) {
                console.log("resume URL:", downloadURL);
                values.resume = downloadURL;
                ToastSuccess("resume Uploaded successfully.");
            }
        } catch (error) {
            console.error("Error uploading resume:", error);
            ToastError("Failed to Uploaded resume.");
            return null;
        }
    };

    const { values, errors, touched, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: jobApplicationSchema,
            onSubmit: async (values, { resetForm }) => {
                console.log("form values", values);
                values.jobId = job?.jobId || "";
                const response = await dispatch(addJobApplication(values));
                console.log(response);
                if (response.payload?.success) {
                    ToastSuccess(response.payload?.message);
                    router.back()
                } else if (response.error?.message) {
                    ToastError(response.error.message || "An error occurred.");
                }
                resetForm();
                setFile(null);
            },
        });
    console.log(errors);

    return (
        <>
            <DefaultLayout>
                <div className="mx-auto max-w-242.5">
                    <Breadcrumb pageName="Job Details" />
                    <div className="flex flex-col gap-9">
                        {/* <!-- Contact Form --> */}
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="flex justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                <div className="p-6.5 w-full">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-base font-semibold leading-7 text-gray-900">Job Details</h3>
                                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Job Details.</p>
                                    </div>
                                    <div className="mt-6 border-t border-gray-100">
                                        <dl className="divide-y divide-gray-100">
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Company Name</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${job?.firstName} ${job?.lastName}`}</dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{job?.email}</dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Job Title</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{job?.title}</dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Dcscription</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{job?.description}</dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Deadline</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{job?.deadline && DateFilter(job?.deadline)}</dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{job?.bio}</dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                            <div className="flex w-0 flex-1 items-center">
                                                                <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
                                                                </svg>
                                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                                    <span className="truncate font-medium">document.pdf</span>
                                                                    {/* <span className="flex-shrink-0 text-gray-400">2.4mb</span> */}
                                                                </div>
                                                            </div>
                                                            <div className="ml-4 flex-shrink-0">
                                                                <Link href={job?.document ?? ""} target="blanck" className="font-medium text-indigo-600 hover:text-indigo-500">View</Link>
                                                            </div>
                                                            <div className="ml-4 flex-shrink-0">
                                                                <Link href={job?.document ?? ""} target="blanck" style={{ alignItems: "center" }} download className="flex font-medium text-indigo-600 hover:text-indigo-500">
                                                                    <svg className="w-6 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4" />
                                                                    </svg>
                                                                    <p>Download</p>
                                                                </Link>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </dd>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Upload your resume<span className="text-red">*</span></dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                        <div className="flex space-x-2">
                                                            <input
                                                                type="file"
                                                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                                                placeholder="Plese select an Image"
                                                                name="file"
                                                                id="file"
                                                                onChange={onFileChange}
                                                            />
                                                            <button type="button" onClick={uploadPdf}
                                                                className="bg-primary font-medium hover:bg-opacity-90 p-3 rounded text-gray">
                                                                upload
                                                            </button>
                                                        </div>
                                                        {errors.resume && touched.resume ? (
                                                            <p className="text-red">{errors.resume}</p>
                                                        ) : null}
                                                    </dd>
                                                </div>
                                                <div className="px-4 py-6">
                                                    <div className="grid grid-cols-2 space-x-2">
                                                        <button
                                                            onClick={cancelApply}
                                                            type="button"
                                                            className="flex w-full justify-center rounded bg-danger p-3 font-medium text-gray hover:bg-opacity-90"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                                                        >
                                                            Apply Now
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    )
}