"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getCookie } from "cookies-next";
import {
  approveJob,
  fetchAllJob,
  fetchAllJobByUniversityId,
  rejectjob,
} from "@/lib/JobSlice/JobSlice";
import { DateFilter } from "@/components/Filters/DateFilter/DateFilter";
import {
  ToastError,
  ToastSuccess,
} from "@/components/ToastMessage/ToastMessage";
import Addbutton from "@/components/FormElements/buttons/Addbutton";
import ApplyButton from "@/components/FormElements/buttons/ApplyButton";
import { StudentCourse } from "@/components/Enum/StudentCourse";

interface User {
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  website: string;
  postedDate: string;
  courses: number[];
  title: string;
  description: string;
  deadline: string;
  document: string;
  approvedDate: string;
  rejectedDate: string;
  status: number;
}

const JobPostTable = () => {
  const dispatch = useDispatch();
  // const [status,setStatus]=useState<number>()
  const [jobs, setJobs] = useState<User[]>([]);
  const role = getCookie("role");

  const state = useSelector((state: any) => state.user);
  const user = state.user;
  console.log("user", user);

  const fetchData = async () => {
    try {
      const universityId = user.universityId;
      const response =
        role === "Student"
          ? await dispatch(fetchAllJobByUniversityId(universityId))
          : await dispatch(fetchAllJob());
      console.log("all jobs", response); // This should contain the data from your API response
      response.payload?.data && setJobs(response.payload.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getCourseName = (courseValue: number): string => {
    return StudentCourse[courseValue];
  };
  const token = getCookie("token");
  const onApproveReject = async (
    jobId: string,
    status: number,
    index: number
  ) => {
    try {
      if (status == 1) {
        const response = await dispatch(rejectjob(jobId));
        updateStatus(response, 2, index);
      } else {
        const response = await dispatch(approveJob(jobId));
        updateStatus(response, 1, index);
      }
    } catch (error) { }
  };

  // update status code
  const updateStatus = (response: any, status: number, index: number) => {
    console.log("response ", response);

    if (response.payload.success) {
      const updatedjobs = [...jobs];
      updatedjobs[index] = {
        ...updatedjobs[index],
        status: status,
      };
      console.log(updatedjobs);
      ToastSuccess(response.payload.message);
      setJobs(updatedjobs);
    } else if (response.error?.message) {
      ToastError(response.error.message || "An error occurred.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchAllJob,fetchAllJobByUniversityId]); // Run once on component mount

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Jobs List" />
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Job List
              </h3>
              {role == "Company" && (
                <Addbutton path="/company/jobposting" text="Add New Job" />
              )}
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      #Sr.No
                    </th>
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                      Name
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Email
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Address
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      City
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      State
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Website
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Post Date
                    </th>
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                      Courses Allow
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Title
                    </th>
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                      Description
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Deadline
                    </th>
                    <th className="min-w-[120px] max-w-[300px] px-4 py-4 font-medium text-black dark:text-white">
                      Document
                    </th>
                    {role !== "Student" && (
                      <>
                        <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                          Approve Date
                        </th>
                        {/* <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                          Reject Date
                        </th> */}
                        <th className="px-4 py-4 font-medium text-black dark:text-white">
                          Status
                        </th>
                      </>
                    )}
                    {role == "Student" && (
                      <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark">
                        <p className="text-sm">{index + 1}</p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {job.firstName + " " + job.lastName}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {job.email}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {job.address}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">{job.city}</p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {job.state}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          <Link
                            target="blanck"
                            href={job.website ?? ""}
                            className="text-blue-500 dark:text-blue-300 hover:underline"
                          >
                            visit website
                          </Link>
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {DateFilter(job.postedDate)}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {job.courses.map((courseValue, index) => (
                            <span key={index}>
                              {getCourseName(courseValue)}
                              {/* Add comma if not last course */}
                              {index !== job.courses.length - 1 && ", "}
                            </span>
                          ))}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {job.title}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white text-sm">
                          {truncateText(job.description, 100)}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {DateFilter(job.deadline)}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          <Link
                            target="blanck"
                            href={job.document}
                            className="text-blue-500 dark:text-blue-300 hover:underline"
                          >
                            view details
                          </Link>
                        </p>
                      </td>
                      {role !== "Student" && (
                        <>
                          <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                              {DateFilter(job.approvedDate)}
                            </p>
                          </td>
                          {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                              {DateFilter(job.rejectedDate)}
                            </p>
                          </td> */}
                          <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                            <p
                              onClick={
                                role === "University"
                                  ? () =>
                                    onApproveReject(
                                      job.jobId,
                                      job.status,
                                      index
                                    )
                                  : undefined
                              }
                              className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium 
                              ${role === "University" && "hover:bg-opacity-50 hover:text-white" }
                              ${job.status === 1
                                ? "bg-success text-success"
                                : job.status === 2
                                  ? "bg-danger text-danger"
                                  : "bg-warning text-warning"
                                }`}
                            >
                              {job.status === 0
                                ? "Pending"
                                : job.status === 1
                                  ? "Approved"
                                  : "Rejected"}
                            </p>
                          </td>
                        </>
                      )}
                      {role === "Student" && (
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            <ApplyButton path="/company/jobposting" id={job.jobId} label="Apply Now"/>
                          </p>
                        </td>
                      )}
                      {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          <Link
                            href={`company/jobposting/${job.jobId}`}
                            className="text-blue-500 dark:text-blue-300 hover:underline"
                          >
                            <svg width="10px" height="10px" viewBox="0 0 1024 1024" fill="#000000" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M574.4 590.4l-3.2 7.2 1.6 8L608 740.8l8 33.6 28-20L760 672l5.6-4 2.4-6.4 220-556.8 8.8-22.4-22.4-8.8-140-55.2-21.6-8-8.8 20.8-229.6 559.2z m244-528l140 55.2-13.6-30.4-220 556.8 8-10.4-116 82.4 36 13.6-33.6-135.2-0.8 15.2 229.6-560-29.6 12.8z" fill="" /><path d="M872 301.6l-107.2-40c-7.2-2.4-10.4-10.4-8-17.6l8-20.8c2.4-7.2 10.4-10.4 17.6-8l107.2 40c7.2 2.4 10.4 10.4 8 17.6l-8 20.8c-2.4 7.2-10.4 10.4-17.6 8zM718.4 645.6l-107.2-40c-7.2-2.4-10.4-10.4-8-17.6l8-20.8c2.4-7.2 10.4-10.4 17.6-8l107.2 40c7.2 2.4 10.4 10.4 8 17.6l-8 20.8c-2.4 7.2-10.4 10.4-17.6 8zM900.8 224l-107.2-40c-7.2-2.4-10.4-10.4-8-17.6l8-20.8c2.4-7.2 10.4-10.4 17.6-8l107.2 40c7.2 2.4 10.4 10.4 8 17.6l-8 20.8c-2.4 7.2-10.4 11.2-17.6 8z" fill="" /><path d="M930.4 965.6H80c-31.2 0-56-24.8-56-56V290.4c0-31.2 24.8-56 56-56h576c13.6 0 24 10.4 24 24s-10.4 24-24 24H80c-4 0-8 4-8 8v619.2c0 4 4 8 8 8h850.4c4 0 8-4 8-8V320c0-13.6 10.4-24 24-24s24 10.4 24 24v589.6c0 31.2-24.8 56-56 56z" fill="" /><path d="M366.4 490.4H201.6c-13.6 0-25.6-11.2-25.6-25.6 0-13.6 11.2-25.6 25.6-25.6h165.6c13.6 0 25.6 11.2 25.6 25.6-0.8 14.4-12 25.6-26.4 25.6zM409.6 584h-208c-13.6 0-25.6-11.2-25.6-25.6 0-13.6 11.2-25.6 25.6-25.6h208c13.6 0 25.6 11.2 25.6 25.6-0.8 14.4-12 25.6-25.6 25.6zM441.6 676.8h-240c-13.6 0-25.6-11.2-25.6-25.6 0-13.6 11.2-25.6 25.6-25.6h240c13.6 0 25.6 11.2 25.6 25.6-0.8 14.4-12 25.6-25.6 25.6z" fill="" /></svg>
                          </Link>
                        </p>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default JobPostTable;
