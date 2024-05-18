import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const UniversityMenu = () => {
  const pathname = usePathname();
  return (
    <>
      {/*  Menu Item Job Post  */}
      <li>
        <Link
          href="/company/jobpost-table"
          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
            pathname.includes("/company/jobposting/jobpost-table") &&
            "bg-graydark dark:bg-meta-4"
          }`}
        >
          <svg
            className="h-6 w-6 text-red-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />{" "}
            <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />{" "}
            <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />{" "}
            <line x1="11" y1="6" x2="20" y2="6" />{" "}
            <line x1="11" y1="12" x2="20" y2="12" />{" "}
            <line x1="11" y1="18" x2="20" y2="18" />
          </svg>
          Job List
        </Link>
      </li>
      {/*  Menu Item Job Post  */}

      {/*  Menu Item Student Form  */}
      <li>
        <Link
          href="/university/students/student-form"
          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
            pathname.includes("/university/students/student-form") &&
            "bg-graydark dark:bg-meta-4"
          }`}
        >
          <svg
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          New Student
        </Link>
      </li>
      {/*  Menu Item Student Form  */}

      {/*  Menu Item STudent table  */}
      <li>
        <Link
          href="/university/students/student-table"
          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
            pathname.includes("/university/students/student-table") &&
            "bg-graydark dark:bg-meta-4"
          }`}
        >
          <svg
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Student List
        </Link>
      </li>
      {/*  Menu Item STudent table  */}
    </>
  );
};

export default UniversityMenu;
