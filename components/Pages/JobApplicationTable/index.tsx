"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { DateFilter } from "@/components/Filters/DateFilter/DateFilter";
import { getCookie } from "cookies-next";
import { fetchAllJobApplication } from "@/lib/JobApplicationSlice/JobApplicationSlice";
import ApplyButton from "@/components/FormElements/buttons/ApplyButton";

interface JobApplication {
  applicationId: string;
  jobId: string;
  studentId: string;
  companyId: string;
  universityId: string;
  appliedDate: string;
  interviewDate: string | null;
  isSelected: number;
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

const JobApplicationTable = () => {
  const dispatch = useDispatch();
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const role = getCookie("role");
  const fetchData = async () => {
    try {
      const response = await dispatch(fetchAllJobApplication());
      console.log("response : ", response); // This should contain the data from your API response
      response.payload?.data && setJobApplications(response.payload.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const token = getCookie("token");

  useEffect(() => {
    fetchData();
  }, []); // Run once on component mount
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Job Application Table" />
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Job Application Table
              </h3>
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      #Sr.No
                    </th>
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                      {role == "Company" ? "Student Name" : "Company Name"}
                    </th>
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                      {role == "Company" ? "Student Email" : "Company Email"}
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Job Title
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Apply Date
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Interview Date
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Student Resume
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Interview Link
                    </th>
                    {role == "Company" && <>
                      <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                        Completed
                      </th>
                      <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                        Completed Date
                      </th>
                      <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                        Score
                      </th>
                      <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                        Feedback
                      </th>
                    </>}
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Status
                    </th>
                    {role == "Company" &&
                      <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                        Action
                      </th>}
                  </tr>
                </thead>
                <tbody>
                  {jobApplications.map((jobApplication, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark">
                        <p className="text-sm">{index + 1}</p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {role === "Company" ? jobApplication.studentName : jobApplication.companyName}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {role === "Company" ? jobApplication.studentEmail : jobApplication.companyEmail}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {jobApplication.jobTitle}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {jobApplication.appliedDate && DateFilter(jobApplication.appliedDate)}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {jobApplication.interviewDate ? DateFilter(jobApplication.interviewDate) : "--"}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          <Link
                            target="blanck"
                            href={jobApplication.resume ?? ""}
                            className="text-blue-500 dark:text-blue-300 hover:underline"
                          >
                            View Resume
                          </Link>
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {jobApplication.assessmentLink ? <Link
                            target="blanck"
                            href={jobApplication.assessmentLink ?? ""}
                            className="text-blue-500 dark:text-blue-300 hover:underline"
                          >
                            Join Meeting
                          </Link> : "--"}
                        </p>
                      </td>
                      {role == "Company" && <>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${jobApplication.assessmentCompleted === true
                              ? "bg-success text-success"
                                : "bg-warning text-warning"
                              }`}
                          >
                            {jobApplication.assessmentCompleted === true
                              ? "Completed"
                                : "Pending"}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {jobApplication.assessmentCompletionDate ? DateFilter(jobApplication.assessmentCompletionDate) : "--"}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {jobApplication.assessmentScore ?? "--"}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {jobApplication.assessmentFeedback ?? "--"}
                          </p>
                        </td>
                      </>}
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${jobApplication.isSelected === 1
                            ? "bg-success text-success"
                            : jobApplication.isSelected === 2
                              ? "bg-danger text-danger"
                              : "bg-warning text-warning"
                            }`}
                        >
                          {jobApplication.isSelected === 0
                            ? "Pending"
                            : jobApplication.isSelected === 1
                              ? "Selected"
                              : "Rejected"}
                        </p>
                      </td>
                      {role == "Company" &&
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            <ApplyButton path="/student/all-apply-jobs/" id={jobApplication.applicationId} label="View Details" />
                          </p>
                        </td>
                      }
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

export default JobApplicationTable;
