import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const CompanyMenu = () => {
  const pathname = usePathname();
  return (
    <>
      {/*  Menu  Job Form  */}
      <li>
        <Link
          href="/company/jobposting/"
          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 
          ${
            pathname.includes("/company/jobposting") &&
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
              d="M8 7H5a2 2 0 0 0-2 2v4m5-6h8M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m0 0h3a2 2 0 0 1 2 2v4m0 0v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6m18 0s-4 2-9 2-9-2-9-2m9-2h.01"
            />
          </svg>
          New Job
        </Link>
      </li>
      {/*  Menu Job Form  */}

      {/*  Menu  Job Table  */}
      <li>
        <Link
          href="/company/jobpost-table"
          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 
          ${
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
          Job List
        </Link>
      </li>
      {/*  Menu Job Table  */}

      {/*  Menu Item Applications  */}
      <li>
        <Link
          href="/company/universitytable"
          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
            pathname.includes("company/universitytable") &&
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
            <line x1="3" y1="21" x2="21" y2="21" />{" "}
            <line x1="3" y1="10" x2="21" y2="10" />{" "}
            <polyline points="5 6 12 3 19 6" />{" "}
            <line x1="4" y1="10" x2="4" y2="21" />{" "}
            <line x1="20" y1="10" x2="20" y2="21" />{" "}
            <line x1="8" y1="14" x2="8" y2="17" />{" "}
            <line x1="12" y1="14" x2="12" y2="17" />{" "}
            <line x1="16" y1="14" x2="16" y2="17" />
          </svg>
          University List
        </Link>
      </li>
      {/*  Menu Item Applications  */}

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
          Job Applications
        </Link>
      </li>
      {/*  Menu Item Applyed Job   */}
    </>
  );
};

export default CompanyMenu;
