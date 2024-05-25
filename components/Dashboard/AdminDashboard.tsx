import React, { useEffect, useState } from 'react'
import CardDataStats from '../CardDataStats'
import UserSlice, { getAdminDashboard } from '@/lib/UserSlice/UserSlice';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Loader from '../common/Loader';

interface AdminData{
  totalUniversities:number,
  totalCompanies : number,
  totalStudents :number
}

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    console.log("start:");
    const response = await dispatch(getAdminDashboard());
    console.log("Admin dashboard :", response);
    response.payload?.data && setData(response.payload.data);
    setLoading(false);
  };
  useEffect(() => {
    console.log("Hello from admin Dashboard");
    fetchData();
  }, []);
  return (
    <>
    {loading && <Loader/>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <Link href={"/company/universitytable"}>
        <CardDataStats
          title="Total Universities"
          total={data?.totalUniversities.toString() ?? "loading..."}
          rate="">
          <svg
            className=" text-red-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <line x1="3" y1="21" x2="21" y2="21" />{" "}
            <line x1="3" y1="10" x2="21" y2="10" />{" "}
            <polyline points="5 6 12 3 19 6" />{" "}
            <line x1="4" y1="10" x2="4" y2="21" />{" "}
            <line x1="20" y1="10" x2="20" y2="21" />{" "}
            <line x1="8" y1="14" x2="8" y2="17" />{" "}
            <line x1="12" y1="14" x2="12" y2="17" />{" "}
            <line x1="16" y1="14" x2="16" y2="17" />
          </svg>
        </CardDataStats>
        </Link>
        <Link href={"/university/students/student-table"}>
        <CardDataStats
          title="Total Companies"
          total={data?.totalCompanies.toString() ?? "loading..."}
          rate=""
        >
          <svg
            className="h-6 w-6 text-red-500"
            width="24"
            height="24"
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
        <CardDataStats
          title="Students"
          total={data?.totalStudents.toString() ?? "loading..."}
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
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">

      </div>
    </>
  )
}

export default AdminDashboard