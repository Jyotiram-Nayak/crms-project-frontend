"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { approveUser, getAllUniversity } from "@/lib/UserSlice/UserSlice";
import Link from "next/link";
import { getCookie } from "cookies-next";
import Pagination from "@/components/Pagination";
import {
  ToastError,
  ToastSuccess,
} from "@/components/ToastMessage/ToastMessage";
import Image from "next/image";
import Loader from "@/components/common/Loader";
import { truncateText } from "@/components/Filters/DataFilter/DataFilter";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  role: string;
  website: string;
  image: string;
  isApproved: boolean;
  createOn: string;
  updateOn: string | null;
}
interface pagination {
  page?: number;
  pageSize?: number;
  filterOn?: string;
  filterQuery?: string;
  sortBy?: string;
  isAscending?: boolean;
}
const UniversityTable: React.FC = () => {
  const dispatch = useDispatch();
  const [universities, setUniversities] = useState<User[]>([]);
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
  const role = getCookie("role");
  const fetchData = async () => {
    setIsLoading(true);
    try {
      console.log("pagination", value);
      const response = await dispatch(getAllUniversity(value));
      console.log(response.payload.data); // This should contain the data from your API response
      response.payload.data && setUniversities(response.payload.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const handleApprove = async (
    userId: string,
    isApproved: boolean,
    index: number
  ) => {
    try {
      const response = await dispatch(approveUser(userId));
      console.log("response", response);
      if (response.payload.success) {
        const tempuniversity = [...universities];
        tempuniversity[index] = {
          ...tempuniversity[index],
          isApproved: !isApproved,
        };
        console.log(tempuniversity);
        ToastSuccess(response.payload.message);
        setUniversities(tempuniversity);
      } else if (response.error?.message) {
        ToastError(response.error.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [value]);

  return (
    <>
    {isLoading && <Loader/>}
      <DefaultLayout>
        <Breadcrumb pageName="University List" />
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <div className="flex flex-wrap align-middle space-x-2">
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
                  <option value="">All Applications</option>
                  <option value="Name">Name</option>
                  <option value="Email">Email</option>
                  <option value="City">City</option>
                  <option value="State">State</option>
                </select>
                <input
                  type="text"
                  placeholder="Type to search..."
                  name="filterQuery"
                  id="filterQuery"
                  value={value.filterQuery?.toLowerCase()}
                  className={`${value.filterOn?.toLowerCase() == "course" && "hidden"}bg-white py-2 rounded-lg border border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  onChange={handleQueryChange}
                />
                <select
                  className="bg-white rounded-lg py-2 border border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="sortby"
                  id="sortby"
                  value={value.sortBy}
                  onChange={handleSortChange}
                >
                  <option value="" disabled>
                    Sort by
                  </option>
                  <option value="Name">Name</option>
                  <option value="Email">Email</option>
                  <option value="City">City</option>
                  <option value="State">State</option>
                </select>
                <select
                  className="bg-white py-2 rounded-lg border border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  name="sortorder"
                  id="sortorder"
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
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {universities.map((university, index) => (
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
                              university.image ??
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
                          {university.firstName + " " + university.lastName}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {university.email}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {truncateText(university.address,50)}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {university.city}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {university.state}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          <Link
                            target="blanck"
                            href={university.website ?? ""}
                            className="text-blue-500 dark:text-blue-300 hover:underline"
                          >
                            visit website
                          </Link>
                        </p>
                      </td>
                      {role == "Company" && (
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            <Link
                              href={`/company/jobposting?universityId=${university.id}`}
                              className="bg-primary font-medium gap-2.5 hover:bg-opacity-90 inline-flex items-center px-2 py-2 text-white"
                            >
                              Apply
                            </Link>
                          </p>
                        </td>
                      )}
                      {role == "Admin" && (
                        <td
                          className="border-b border-[#eee] px-4 py-5 dark:border-strokedark"
                          onClick={() => {
                            handleApprove(
                              university.id,
                              university.isApproved,
                              index
                            );
                          }}
                        >
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                              university.isApproved == true
                                ? "bg-success text-success"
                                : "bg-warning text-warning"
                            }`}
                          >
                            {university.isApproved == true
                              ? "Approved"
                              : "Pending"}
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

export default UniversityTable;
