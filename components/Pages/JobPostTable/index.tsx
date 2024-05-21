"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { ChangeEvent, useEffect, useState } from "react";
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
import Pagination from "@/components/Pagination";
import Image from "next/image";

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
  image:string;
}
interface pagination {
  page?: number;
  pageSize?: number;
  filterOn?: string;
  filterQuery?: string;
  sortBy?: string;
  isAscending?: boolean;
}

const JobPostTable: React.FC = () => {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState<User[]>([]);
  const role = getCookie("role");
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

  const state = useSelector((state: any) => state.user);
  const user = state.user;
  console.log("user", user);

  const fetchData = async () => {
    try {
      console.log("parameters value :", value);
      const universityId = user.universityId;
      const response =
        role === "Student"
          ? await dispatch<any>(
              fetchAllJobByUniversityId({ universityId, val: value })
            )
          : await dispatch<any>(fetchAllJob(value));
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
        const response = await dispatch<any>(rejectjob(jobId));
        updateStatus(response, 2, index);
      } else {
        const response = await dispatch<any>(approveJob(jobId));
        updateStatus(response, 1, index);
      }
    } catch (error) {}
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
  }, [value]);

  // sort the description
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Jobs List" />
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-wrap justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <div className="flex flex-wrap space-x-2">
                <select
                  className="bg-white py-2 rounded-lg border border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="filteron"
                  id="filteron"
                  value={value.filterOn}
                  onChange={handleFilterChange}
                >
                  <option value="" disabled>
                    Filter on
                  </option>
                  <option value="FirstName">Name</option>
                  <option value="Email">Email</option>
                  <option value="Title">Title</option>
                  <option value="City">City</option>
                  <option value="State">State</option>
                </select>
                <input
                  type="text"
                  placeholder="Type to search..."
                  name="filterQuery"
                  id="filterQuery"
                  value={value.filterQuery}
                  className="bg-white rounded-lg py-2 border border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={handleQueryChange}
                />
                <select
                  className="bg-white rounded-lg border py-2 border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="sortby"
                  id="sortby"
                  value={value.sortBy}
                  onChange={handleSortChange}
                >
                  <option value="" disabled>
                    Sort by
                  </option>
                  <option value="Title">Title</option>
                  <option value="FirstName">Name</option>
                  <option value="Posted Date">Posted Date</option>
                  <option value="City">City</option>
                  <option value="State">State</option>
                </select>
                <select
                  className="bg-white rounded-lg border py-2 border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="sortorder"
                  id="sortorder"
                  onChange={handleOrderChange}
                >
                  <option value="true">Ascending</option>
                  <option value="false">Descending</option>
                </select>
              </div>
              {role == "Company" && (
                <Addbutton path="/company/jobposting" text="Add New Job" />
              )}
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Sr.No
                    </th>
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                      Name
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Email
                    </th>
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
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
                  {jobs &&
                    jobs.map((job, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark">
                          <p className="text-sm">{index + 1}</p>
                        </td>
                        <td className="border-[#eee] border-b dark:border-strokedark flex items-center px-4 py-5 space-x-2">
                          <span className="h-12 w-12 rounded-full">
                            <Image
                              width={112}
                              height={112}
                              src={
                                job.image ??
                                "/images/user/profile-image.jpg"
                              }
                              style={{
                                borderRadius: "50%",
                                width: "auto",
                                height: "auto",
                              }}
                              alt="User"
                              priority
                            />
                          </span>
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
                            {truncateText(job.address, 100)}
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
                              ${role === "University" && "hover:bg-opacity-50 hover:text-white"}
                              ${
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
                          </>
                        )}
                        {role === "Student" && (
                          <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                              <ApplyButton
                                path="/company/jobpost-table"
                                id={job.jobId}
                                label="Apply Now"
                              />
                            </p>
                          </td>
                        )}
                      </tr>
                    ))}
                  {/* {jobs.length > 0 && (
                    <tr>
                      <td colSpan={6}>Data not found</td>
                    </tr>
                  )} */}
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

export default JobPostTable;
