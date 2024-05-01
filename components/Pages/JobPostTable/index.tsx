"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { getCookie } from "cookies-next";
import Displaybutton from "@/components/FormElements/buttons/Displaybutton";
import { approveJob, fetchAllJob, rejectjob } from "@/lib/JobSlice/JobSlice";
import { DateFilter } from "@/components/Filters/DateFilter/DateFilter";
import { ToastError, ToastSuccess } from "@/components/ToastMessage/ToastMessage";
import Addbutton from "@/components/FormElements/buttons/Addbutton";

interface User {
  jobId:string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  website: string;
  postedDate:string;
  title:string;
  description:string;
  deadline:string;
  document:string;
  approvedDate:string;
  rejectedDate:string;
  status: number;
}

const JobPostTable = () => {
  const dispatch = useDispatch();
  // const [status,setStatus]=useState<number>()
  const [jobs, setJobs] = useState<User[]>([]);
  const role = getCookie("role");
  const fetchData = async () => {
    try {
      const response = await dispatch(fetchAllJob());
      console.log(response); // This should contain the data from your API response
      response.payload?.data && setJobs(response.payload.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const token = getCookie("token");
  const onApproveReject = async (
    jobIdId: string,
    status: number,
    index: number
  ) => {
    try {
      if (status == 1) {
        const response = await dispatch(rejectjob(jobIdId));
        updateStatus(response, 2, index);
      } else {
        const response = await dispatch(approveJob(jobIdId));
        updateStatus(response, 1, index);
      }
    } catch (error) {}
  };

  // update status code
  const updateStatus = (response: any, status: number, index: number) => {
    console.log("response ",response);
    
    if (response.payload.success) {
      const updatedjobs = [...jobs];
      updatedjobs[index] = {
        ...updatedjobs[index],
        status: status,
      };
      console.log(updatedjobs)
      ToastSuccess(response.payload.message);
      setJobs(updatedjobs);
    }else if (response.error?.message) {
      ToastError(response.error.message || "An error occurred.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once on component mount
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Job Post Table" />
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Job Post Table
              </h3>
              {role == "Company" && <Addbutton path="/company/jobposting" text="Add New Job" />}
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
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Title
                    </th>
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                      Description
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Deadline
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Document
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Approve Date
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Reject Date
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Status
                    </th>
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
                        <p className="text-black dark:text-white">
                          {job.city}
                        </p>
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
                            href={job.website}
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
                          {job.title}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {job.description}
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
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                        {DateFilter(job.approvedDate)}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {DateFilter(job.rejectedDate)}
                        </p>
                      </td>
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
                          className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                            job.status === 1
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
