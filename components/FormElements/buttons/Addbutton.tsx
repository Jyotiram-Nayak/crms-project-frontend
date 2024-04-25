import React from 'react'
import Link from "next/link";

interface Props {
  path: string;
  text: string;
}

const Addbutton:React.FC<Props> = ({path,text}) => {
  return (
    <>
    <Link
    href={path}
    className="bg-primary font-medium gap-2.5 hover:bg-opacity-90 inline-flex items-center px-2 py-2 text-white">
    <span>
      <svg
        className="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </span>
    {text}
  </Link> 
    </>
  )
}

export default Addbutton;

