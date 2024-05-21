"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Pagination from "@/components/Pagination";
import {
  ToastError,
  ToastSuccess,
} from "@/components/ToastMessage/ToastMessage";
import {
  approveUser,
  getAllCompany,
  getAllUniversity,
} from "@/lib/UserSlice/UserSlice";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
const CompanyList = () => {
  const dispatch = useDispatch();
  const [companies, setCompanies] = useState<User[]>([]);
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
  const role = getCookie("role");
  const fetchData = async () => {
    try {
      console.log("pagination", value);
      const response = await dispatch(getAllCompany(value));
      console.log(response.payload.data); // This should contain the data from your API response
      response.payload.data && setCompanies(response.payload.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
        const tempcompanies = [...companies];
        tempcompanies[index] = {
          ...tempcompanies[index],
          isApproved: !isApproved,
        };
        console.log(tempcompanies);
        ToastSuccess(response.payload.message);
        setCompanies(tempcompanies);
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
      <DefaultLayout>
        <Breadcrumb pageName="Company List" />
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
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company, index) => (
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
                              company.image ?? "/images/user/profile-image.jpg"
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
                          {company.firstName + " " + company.lastName}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {company.email}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {company.address}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {company.city}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {company.state}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          <Link
                            target="blanck"
                            href={company.website ?? ""}
                            className="text-blue-500 dark:text-blue-300 hover:underline"
                          >
                            visit website
                          </Link>
                        </p>
                      </td>
                      {role == "Admin" && (
                        <td
                          className="border-b border-[#eee] px-4 py-5 dark:border-strokedark"
                          onClick={() => {
                            handleApprove(
                              company.id,
                              company.isApproved,
                              index
                            );
                          }}
                        >
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                              company.isApproved == true
                                ? "bg-success text-success"
                                : "bg-warning text-warning"
                            }`}
                          >
                            {company.isApproved == true
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

export default CompanyList;
