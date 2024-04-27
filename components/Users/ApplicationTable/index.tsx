"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import {
  addApplication,
  approveApplication,
  fetchAllApplication,
  rejectApplication,
} from "@/lib/ApplicationSlice/ApplicationSlice";
import { DateFilter } from "@/components/Filters/DateFilter/DateFilter";
import { getCookie } from "cookies-next";

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
  status: number;
  dateSubmitted: string;
  // dateApproved: string | null;
  // dateRejected: string | null;
}

const ApplicationTable = () => {
  const dispatch = useDispatch();
  // const [status,setStatus]=useState<number>()
  const [applications, setApplications] = useState<User[]>([]);
  const role = getCookie("role");
  const fetchData = async () => {
    try {
      const response = await dispatch(fetchAllApplication());
      // console.log(response.payload.data.result); // This should contain the data from your API response
      response.payload.data && setApplications(response.payload.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onApproveReject = async (
    applicationId: string,
    status: number,
    index: number
  ) => {
    try {
      if (status == 1) {
        const response = await dispatch(rejectApplication(applicationId));
        updateStatus(response, 2, index);
      } else {
        const response = await dispatch(approveApplication(applicationId));
        updateStatus(response, 1, index);
      }
    } catch (error) {}
  };

  //update status code
  const updateStatus = (response: any, status: number, index: number) => {
    if (response.payload.success) {
      const updatedApplications = [...applications];
      updatedApplications[index] = {
        ...updatedApplications[index],
        status: status,
      };
      // console.log(updatedApplications)
      setApplications(updatedApplications);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once on component mount
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Application Table" />
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Application Table
              </h3>
              {/* <Addbutton path="./student-form/" text="Add Student" /> */}
              {/* <Displaybutton path=".//" text="All Application"/> */}
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      #Sr.No
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
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
                      Submitted Date
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark">
                        <p className="text-sm">{index + 1}</p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {application.firstName + " " + application.lastName}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {application.email}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {application.address}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {application.city}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {application.state}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          <Link
                            target="blanck"
                            href={application.website}
                            className="text-blue-500 dark:text-blue-300 hover:underline"
                          >
                            visit website
                          </Link>
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {DateFilter(application.dateSubmitted)}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p
                          onClick={
                            role === "University"
                              ? () =>
                                  onApproveReject(
                                    application.id,
                                    application.status,
                                    index
                                  )
                              : undefined
                          }
                          className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                            application.status === 1
                              ? "bg-success text-success"
                              : application.status === 2
                                ? "bg-danger text-danger"
                                : "bg-warning text-warning"
                          }`}
                        >
                          {application.status === 0
                            ? "Pending"
                            : application.status === 1
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

export default ApplicationTable;
