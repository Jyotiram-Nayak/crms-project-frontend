import React, { useEffect, useState } from "react";
import CardDataStats from "../CardDataStats";
import { useDispatch } from "react-redux";
import { getCompanyDashboard, getUniversityDashboard } from "@/lib/UserSlice/UserSlice";
import Link from "next/link";

interface CompanyData {
totalJobs:number,
totalApplication:number,
pendingStudents:number,
selectedStudents:number,
rejectedStudents:number,
}

const CompanyDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<CompanyData | null>(null);
  const fetchData = async () => {
    console.log("start:");
    const response = await dispatch(getCompanyDashboard());
    console.log("University dashboard :", response);
    response.payload?.data && setData(response.payload.data);
  };
  useEffect(() => {
    console.log("Hello from university Dashboard");
    fetchData();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Link href={"/company/jobpost-table"}>
        <CardDataStats
          title="Total Jobs"
          total={data?.totalJobs.toString() ?? "loading..."}
          rate=""
        >
          <svg
            className="h-6 w-6 text-red-500"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <rect x="3" y="7" width="18" height="13" rx="2" />{" "}
            <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />{" "}
            <line x1="12" y1="12" x2="12" y2="12.01" />{" "}
            <path d="M3 13a20 20 0 0 0 18 0" />
          </svg>
        </CardDataStats>
        </Link>
        <Link href={"/university/students/student-table"}>
        <CardDataStats
          title="Total Applications"
          total={data?.totalApplication.toString() ?? "loading..."}
          rate=""
        >
          <svg
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </CardDataStats>
        </Link>
        <CardDataStats
          title="Selected Students"
          total={data?.selectedStudents.toString() ?? "loading..."}
          rate=""
        >
          <svg
            className="h-6 w-6 text-red-500"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <circle cx="9" cy="7" r="4" />{" "}
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />{" "}
            <path d="M16 11l2 2l4 -4" />
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Pending Students"
          total={data?.pendingStudents.toString() ?? "loading..."}
          rate=""
        >
          <svg
            className="h-6 w-6 text-red-500"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <circle cx="9" cy="7" r="4" />{" "}
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />{" "}
            <path d="M17 9l4 4m0 -4l-4 4" />
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Rejected Students"
          total={data?.rejectedStudents.toString() ?? "loading..."}
          rate=""
        >
          <svg
            className="h-6 w-6 text-red-500"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <circle cx="9" cy="7" r="4" />{" "}
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />{" "}
            <path d="M17 9l4 4m0 -4l-4 4" />
          </svg>
        </CardDataStats>
      </div>
    </>
  );
};

export default CompanyDashboard;
