"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { DateFilter } from "@/components/Filters/DateFilter/DateFilter";
import { getCookie } from "cookies-next";
import { fetchAllJobApplication } from "@/lib/JobApplicationSlice/JobApplicationSlice";
import ApplyButton from "@/components/FormElements/buttons/ApplyButton";
import { StudentCourse } from "@/components/Enum/StudentCourse";
import Pagination from "@/components/Pagination";
import Loader from "@/components/common/Loader";

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
  course: number;
  city: string;
  state: string;
  image: string;
  companyName: string;
  companyEmail: string;
  universityName: string;
  assessmentCompleted?: boolean | null; // Only for company role
  assessmentCompletionDate?: string | null; // Only for company role
  assessmentScore?: string | null; // Only for company role
  assessmentFeedback?: string | null; // Only for company role
}

interface pagination {
  page?: number;
  pageSize?: number;
  filterOn?: string;
  filterQuery?: string;
  sortBy?: string;
  isAscending?: boolean;
}
const JobApplicationTable = () => {
  const dispatch = useDispatch();
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<pagination>({
    page: 1,
    pageSize: 10,
    filterOn: "",
    filterQuery: "",
    sortBy: "",
    isAscending: true,
  });

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue((prevValue) => ({
      ...prevValue,
      filterOn: e.target.value,
      filterQuery: "",
    }));
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prevValue) => ({ ...prevValue, filterQuery: e.target.value }));
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue((prevValue) => ({ ...prevValue, sortBy: e.target.value }));
  };

  const handleOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue((prevValue) => ({
      ...prevValue,
      isAscending: e.target.value === "true",
    }));
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue((prevValue) => ({ ...prevValue, filterQuery: e.target.value }));
  };
  const handleSelectedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue((prevValue) => ({ ...prevValue, filterQuery: e.target.value }));
  };

  const role = getCookie("role");
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await dispatch(fetchAllJobApplication(value));
      console.log("response : ", response); 
      response.payload?.data && setJobApplications(response.payload.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false)
  };
  const token = getCookie("token");

  useEffect(() => {
    fetchData();
  }, [value]);
  return (
    <>
    {isLoading && <Loader/>}
      <DefaultLayout>
        <Breadcrumb pageName="Job Application List" />
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <div className="flex flex-wrap align-middle space-x-2">
                <select
                  className="bg-white py-2 rounded-lg border border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="course"
                  id="course"
                  value={value.filterOn}
                  onChange={handleFilterChange}
                >
                  <option value="" disabled>
                    Filter on
                  </option>
                  <option value="">All Applications</option>
                  <option value="StudentName">Student Name</option>
                  <option value="Email">Email</option>
                  <option value="City">City</option>
                  <option value="State">State</option>
                  <option value="Course">Course</option>
                  {/* <option value="isSelected">Status</option> */}
                </select>
                {value.filterOn?.toLowerCase() !== "course" &&
                  value.filterOn?.toLowerCase() !== "isselected" && (
                    <input
                      type="text"
                      placeholder="Type to search..."
                      name="filterQuery"
                      id="filterQuery"
                      value={value.filterQuery}
                      className={`${value.filterOn?.toLowerCase() == "course" && "hidden"}bg-white py-2 rounded-lg border border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      onChange={handleQueryChange}
                    />
                  )}
                {value.filterOn?.toLowerCase() === "course" && (
                  <select
                    className="rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="course"
                    id="course"
                    onChange={handleCourseChange}
                  >
                    <option value="" disabled>
                      Select Course
                    </option>
                    <option value="">All Course</option>
                    {Object.keys(StudentCourse)
                      .filter((key) =>
                        isNaN(
                          Number(
                            StudentCourse[key as keyof typeof StudentCourse]
                          )
                        )
                      )
                      .map((key) => (
                        <option
                          key={key}
                          value={
                            StudentCourse[key as keyof typeof StudentCourse]
                          }
                        >
                          {StudentCourse[key as keyof typeof StudentCourse]}
                        </option>
                      ))}
                  </select>
                )}
                {value.filterOn?.toLowerCase() === "isselected" && (
                  <select
                    className="rounded-lg border py-2 border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="course"
                    id="course"
                    onChange={handleSelectedChange}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="">All Students</option>
                    <option value="true">Selected</option>
                    <option value="false">Pending</option>
                  </select>
                )}
                <select
                  className="bg-white rounded-lg py-2 border border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="course"
                  id="course"
                  value={value.sortBy}
                  onChange={handleSortChange}
                >
                  <option value="" disabled>
                    Sort by
                  </option>
                  <option value="StudentName">Student Name</option>
                  <option value="AppliedDate">Apply Date</option>
                  <option value="InterviewDate">Interview Date</option>
                  <option value="completiondate">Completion Date</option>
                </select>
                <select
                  className="bg-white py-2 rounded-lg border border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="course"
                  id="course"
                  onChange={handleOrderChange}
                >
                  <option value="true">Ascending</option>
                  <option value="false">Descending</option>
                </select>
              </div>
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Sr.No
                    </th>
                    {role === "Admin" && (
                      <>
                        <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                          Student Name
                        </th>
                        <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                          Student Email
                        </th>
                      </>
                    )}
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                      University Name
                    </th>
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                      {role == "Company" ? "Student Name" : "Company Name"}
                    </th>
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                      {role == "Company" ? "Student Email" : "Company Email"}
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Course
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      City
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      State
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
                    {role == "Company" && (
                      <>
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
                      </>
                    )}
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Status
                    </th>
                    {role == "Company" && (
                      <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {jobApplications.map((jobApplication, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark">
                        <p className="text-sm">{index + 1}</p>
                      </td>
                      {role === "Admin" && (
                        <>
                          <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                              {jobApplication.studentName}
                            </p>
                          </td>
                          <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                              {jobApplication.studentEmail}
                            </p>
                          </td>
                        </>
                      )}
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {jobApplication.universityName}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {role === "Company"
                            ? jobApplication.studentName
                            : jobApplication.companyName}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {role === "Company"
                            ? jobApplication.studentEmail
                            : jobApplication.companyEmail}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {StudentCourse[jobApplication.course]}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {jobApplication.city}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {jobApplication.state}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {jobApplication.jobTitle}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {jobApplication.appliedDate &&
                            DateFilter(jobApplication.appliedDate)}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {jobApplication.interviewDate
                            ? DateFilter(jobApplication.interviewDate)
                            : "--"}
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
                          {jobApplication.assessmentLink ? (
                            <Link
                              target="blanck"
                              href={jobApplication.assessmentLink ?? ""}
                              className="text-blue-500 dark:text-blue-300 hover:underline"
                            >
                              Join Meeting
                            </Link>
                          ) : (
                            "--"
                          )}
                        </p>
                      </td>
                      {role == "Company" && (
                        <>
                          <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                            <p
                              className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                                jobApplication.assessmentCompleted === true
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
                              {jobApplication.assessmentCompletionDate
                                ? DateFilter(
                                    jobApplication.assessmentCompletionDate
                                  )
                                : "--"}
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
                        </>
                      )}
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                            jobApplication.isSelected === 1
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
                      {role == "Company" && (
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            <ApplyButton
                              path="/student/all-apply-jobs/"
                              id={jobApplication.applicationId}
                              label="View Details"
                            />
                          </p>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination value={value} setValue={setValue} />
      </DefaultLayout>
    </>
  );
};

export default JobApplicationTable;
