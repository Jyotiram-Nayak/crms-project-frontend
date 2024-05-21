import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const StudentMenu = () => {
  const pathname = usePathname();
  return (
    <>
      {/*  Menu Item Job Post  */}
      <li>
        <Link
          href="/company/jobpost-table"
          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
            pathname.includes("/company/jobpost-table") &&
            "bg-graydark dark:bg-meta-4"
          }`}
        >
          <svg
            className=" text-red-500"
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
            <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />{" "}
            <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />{" "}
            <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />{" "}
            <line x1="11" y1="6" x2="20" y2="6" />{" "}
            <line x1="11" y1="12" x2="20" y2="12" />{" "}
            <line x1="11" y1="18" x2="20" y2="18" />
          </svg>
          Jobs
        </Link>
      </li>
      {/*  Menu Item Job Post  */}

      {/*  Menu Item applyed Job   */}
      <li>
        <Link
          href="/student/all-apply-jobs"
          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
            pathname.includes("/student/all-apply-jobs") &&
            "bg-graydark dark:bg-meta-4"
          }`}
        >
          <svg
            className="text-gray-800 dark:text-white"
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
              d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
            />
          </svg>
          Applyed Jobs
        </Link>
      </li>
      {/*  Menu Item Applyed Job   */}
    </>
  );
};

export default StudentMenu;
