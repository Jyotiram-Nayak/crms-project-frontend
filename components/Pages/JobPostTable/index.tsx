"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getCookie } from "cookies-next";
import {
  approveJob,
  deleteJob,
  fetchAllJob,
  fetchAllJobByUniversityId,
  rejectjob,
} from "@/lib/JobSlice/JobSlice";
import { DateFilter, truncateText } from "@/components/Filters/DataFilter/DataFilter";
import {
  ToastError,
  ToastSuccess,
} from "@/components/ToastMessage/ToastMessage";
import Addbutton from "@/components/FormElements/buttons/Addbutton";
import ApplyButton from "@/components/FormElements/buttons/ApplyButton";
import { StudentCourse } from "@/components/Enum/StudentCourse";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import Loader from "@/components/common/Loader";

interface Jobs {
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
  image: string;
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
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const role = getCookie("role");
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
      page: 1,
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
    setIsLoading(true);
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
    setIsLoading(false);
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

  //on delete
  const onDeleteStudent = async (jobId: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this job ?"
      );
      if (!confirmed) {
        return;
      }

      const response = await dispatch<any>(deleteJob(jobId));
      if (response.payload?.success) {
        ToastSuccess(response.payload?.message);
        setJobs((prevValue) =>
        prevValue.filter((job) => job.jobId !== jobId)
        );
      } else if (response.error?.message) {
        ToastError(response.error.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [value]);

  return (
    <>
      {isLoading && <Loader />}
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
                    {/* {role == "Student" || role == "Company" && ( */}
                      <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                        Action
                      </th>
                    {/* )} */}
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
                                job.image ?? "/images/user/profile-image.jpg"
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
                            {truncateText(job.address, 50)}
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
                            {truncateText(job.description, 50)}
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
                        {role === "Company" && (
                          <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                              <Link href={`/company/jobposting/${job.jobId}`}>
                                <button className="hover:text-primary">
                                  <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                                    />
                                  </svg>
                                </button>
                              </Link>
                              <button
                            onClick={() => onDeleteStudent(job.jobId)}
                            className="hover:text-primary"
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                fill=""
                              />
                              <path
                                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                fill=""
                              />
                              <path
                                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                fill=""
                              />
                              <path
                                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                fill=""
                              />
                            </svg>
                          </button>
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

export default JobPostTable;
