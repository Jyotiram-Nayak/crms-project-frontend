"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useEffect, useState } from "react";
import Addbutton from "@/components/FormElements/buttons/Addbutton";
import { useDispatch } from "react-redux";
import { getAllUniversity } from "@/lib/UserSlice/UserSlice";
import Link from "next/link";
import { addApplication } from "@/lib/ApplicationSlice/ApplicationSlice";
import { log } from "console";
import Displaybutton from "@/components/FormElements/buttons/Displaybutton";
import {
  ToastError,
  ToastSuccess,
} from "@/components/ToastMessage/ToastMessage";

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

const UniversityTable: React.FC = () => {
  const dispatch = useDispatch();
  const [universitys, setUniversitys] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      const response = await dispatch(getAllUniversity());
      console.log(response.payload.data); // This should contain the data from your API response
      response.payload.data && setUniversitys(response.payload.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once on component mount

  const apply = async (universityId: string) => {
    try {
      console.log(universityId);
      const response = await dispatch(addApplication(universityId));
      console.log(response);
      if (response.payload.success) {
        ToastSuccess(response.payload?.message);
      } else {
        ToastError(response.payload?.message);
      }
    } catch (error) {}
  };
  // console.log(students)
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="University Table" />
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                University Table
              </h3>
              {/* <Addbutton path="./student-form/" text="Add Student" /> */}
              <Displaybutton path="application" text="All Applications" />
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      #Sr.No
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
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
                  {universitys.map((university, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark">
                        <p className="text-sm">{index + 1}</p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
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
                          {university.address}
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
                            href={university.website}
                            className="text-blue-500 dark:text-blue-300 hover:underline"
                          >
                            visit website
                          </Link>
                        </p>
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          <Link
                            href="#"
                            className="bg-primary font-medium gap-2.5 hover:bg-opacity-90 inline-flex items-center px-2 py-2 text-white"
                            onClick={() => apply(university.id)}
                          >
                            Apply
                          </Link>
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

export default UniversityTable;
