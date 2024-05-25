"use client"
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { DateFilter } from '@/components/Filters/DataFilter/DataFilter';
import generatePatternText from '@/components/Filters/GeneratePatternText/generatePatternText';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { ToastError, ToastSuccess } from '@/components/ToastMessage/ToastMessage';
import Loader from '@/components/common/Loader';
import { JobAssessment } from '@/lib/JobApplicationSlice/JobApplicationSlice';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface JobAppDetails {
    applicationId: string;
    appliedDate: string;
    interviewDate: string | null;
    isSelected: string;
    resume: string;
    assessmentLink: string | null;
    createOn: string;
    updateOn: string | null;
    jobTitle: string;
    studentName: string;
    studentEmail: string;
    companyName: string;
    companyEmail: string;
    universityName: string;
    assessmentCompleted?: boolean | null; // Only for company role
    assessmentCompletionDate?: string | null; // Only for company role
    assessmentScore?: string | null; // Only for company role
    assessmentFeedback?: string | null; // Only for company role
}

interface JobApplication {
    interviewDate: string,
    isSelected: string,
    assessmentLink: string,
    assessmentCompleted: boolean,
    assessmentScore: string,
    assessmentFeedback: string,
}

const initialValues: JobApplication = {
    interviewDate: "",
    isSelected: "Pending",
    assessmentLink: "",
    assessmentCompleted: false,
    assessmentScore: "",
    assessmentFeedback: ""
}

const ApplicationDetails = ({ params }: { params: { applicationId: string } }) => {
    const [jobApplication, setjobApplication] = useState<JobAppDetails | null>(null)
    const router = useRouter();
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state.jobApplication);
    const [isLoading, setIsLoading] = useState(false);

    const applicationData = state.jobApplication;
    const fetchData = async () => {
        const Application = applicationData.find(
            (application: any) => application.applicationId === params.applicationId
        );
        // console.log("get from selector :", Application);
        if (Application != null) {
            setjobApplication(Application);
        }
    }
    const formData = new FormData();

    const { values, errors, touched, handleSubmit, handleChange, setValues } =
        useFormik({
            initialValues,
            //   validationSchema: jobApplicationchema,
            onSubmit: async (values, { resetForm }) => {
                Object.entries(values).forEach(([key, value]) => {
                    // Convert enum values to numbers if necessary
                    if (typeof value === 'number' && !isNaN(value)) {
                        formData.append(key, value.toString()); // Convert number to string
                    } else {
                        formData.append(key, value);
                    }
                });
                console.log("form values", formData);
                console.log("form values", formData);
                var applicationId = jobApplication?.applicationId;
                setIsLoading(true)
                const response = await dispatch(JobAssessment({ applicationId: applicationId, val: formData }));
                console.log(response);
                if (response.payload?.success) {
                    ToastSuccess(response.payload?.message);
                    router.back()
                    resetForm();
                } else if (response.error?.message) {
                    ToastError(response.error.message || "An error occurred.");
                }
                setIsLoading(false)
            },
        });
    console.log(errors);

    const cancelApply = () => {
        router.back();
    };

    function createMeetingLink(): string {
        const rootUrl = window.location.origin;
        const patternText = generatePatternText();
        const meetingLink = `${rootUrl}/zego-cloud/${patternText}`;
        return meetingLink;
    }
    useEffect(() => {
        fetchData();
    }, [])

    //fill the fetch values
    useEffect(() => {
        setValues({
            interviewDate: jobApplication?.interviewDate || "",
            isSelected: jobApplication?.isSelected || "",
            assessmentLink: jobApplication?.assessmentLink || createMeetingLink(),
            assessmentCompleted: jobApplication?.assessmentCompleted || false,
            assessmentScore: jobApplication?.assessmentScore || "",
            assessmentFeedback: jobApplication?.assessmentFeedback || ""
        })
    }, [jobApplication])
    return (
        <>
        {isLoading && <Loader/>}
        <DefaultLayout>
            <div className="mx-auto max-w-242.5">
                <Breadcrumb pageName="Job Details" />
                <div className="flex flex-col gap-9">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <div className="p-6.5 w-full">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
                                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
                                </div>
                                <div className="mt-6 border-t border-gray-100">
                                    <dl className="divide-y divide-gray-100">
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Student Name</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobApplication?.studentName}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Student Email</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobApplication?.studentEmail}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">University Name</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobApplication?.universityName}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Job Title</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobApplication?.jobTitle}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Resume</dt>
                                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                        <div className="flex w-0 flex-1 items-center">
                                                            <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
                                                            </svg>
                                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                                <span className="truncate font-medium">document.pdf</span>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4 flex-shrink-0">
                                                            <a href={jobApplication?.resume} target="blanck" className="font-medium text-indigo-600 hover:text-indigo-500">View</a>
                                                        </div>
                                                        <div className="ml-4 flex-shrink-0">
                                                            <a href={jobApplication?.resume ?? ""} download target='blanck' style={{ alignItems: "center" }} className="flex font-medium text-indigo-600 hover:text-indigo-500">
                                                                <svg className="w-6 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4" />
                                                                </svg>
                                                                <p>Download</p>
                                                            </a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </dd>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Assessment Link</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    <input
                                                        type="text"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        name="assessmentLink"
                                                        id="assessmentLink"
                                                        value={values.assessmentLink}
                                                        disabled
                                                    />
                                                </dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Interview Date</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    <input
                                                        type="date"
                                                        placeholder="Select interview Date"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        name="interviewDate"
                                                        id="interviewDate"
                                                        value={DateFilter(values.interviewDate)}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.interviewDate && touched.interviewDate ? (
                                                        <p className="text-red">{errors.interviewDate.toString()}</p>
                                                    ) : null}
                                                </dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Score</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    <input
                                                        type="number"
                                                        placeholder="Enter student's Score"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        name="assessmentScore"
                                                        id="assessmentScore"
                                                        value={values.assessmentScore}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.assessmentScore && touched.assessmentScore ? (
                                                        <p className="text-red">{errors.assessmentScore}</p>
                                                    ) : null}
                                                </dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Selection Status</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    <select
                                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        name="isSelected"
                                                        id="isSelected"
                                                        value={values.isSelected}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="" disabled>
                                                            Select status
                                                        </option>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Selected">Selected</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </select>
                                                    {errors.isSelected && touched.isSelected ? (
                                                        <p className="text-red">{errors.isSelected}</p>
                                                    ) : null}
                                                </dd>
                                            </div>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900">Feedback</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                    <textarea
                                                        placeholder="Enter feedback for student "
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        name="assessmentFeedback"
                                                        id="assessmentFeedback"
                                                        value={values.assessmentFeedback}
                                                        onChange={handleChange}
                                                    ></textarea>
                                                    {errors.assessmentScore && touched.assessmentScore ? (
                                                        <p className="text-red">{errors.assessmentScore}</p>
                                                    ) : null}
                                                </dd>
                                                <div className='space-x-2 flex '>
                                                    <input
                                                        type="checkbox"
                                                        name="assessmentCompleted"
                                                        id="assessmentCompleted"
                                                        checked={values.assessmentCompleted ? true : false}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="assessmentCompleted">Mark as Completed</label>
                                                </div>
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
                                                        Submit
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
    );
};

export default ApplicationDetails;
