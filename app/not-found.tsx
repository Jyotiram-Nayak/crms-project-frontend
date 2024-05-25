"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const route = useRouter();
  const handleClick = () => {
    // Check if there's a previous page in history
    if (typeof window !== "undefined" && window.history.length > 1) {
      route.back();
    } else {
      // Fallback to home page if no history
      route.replace("/");
    }
  };
  return (
    <>
      <section
        className="bg-white dark:bg-gray-900 h-screen"
        style={{ paddingTop: "5%" }}
      >
        <div
          className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex justify-center items-center flex-col"
          style={{
            width: "60%",
            border: "3px solid black",
            borderTop: "35px solid black",
          }}
        >
          <Image
            src={"/logo-png/logo-black-transparent-up.png"}
            alt="CareerForge Logo"
            width={150}
            height={50}
          />
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl dark:text-primary-500 text-red flex justify-center">
              <p>4</p>
              <svg
                className="h-30 w-30 text-red-500"
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
                <circle cx="12" cy="12" r="9" />{" "}
                <line x1="9" y1="10" x2="9.01" y2="10" />{" "}
                <line x1="15" y1="10" x2="15.01" y2="10" />{" "}
                <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
              </svg>
              <p>4</p>
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white text-red">
              Something went wrong!
            </p>
            <strong>
              <p className="mb-4 text-lg text-gray-500 dark:text-gray-400 text-red">
                Sorry, we can't find that page.
              </p>
            </strong>
            <p className="flex">
            <button
              type="button"
              onClick={handleClick}
              className="mt-5 me-2 rounded bg-black p-3 font-medium text-gray hover:bg-opacity-90 flex space-x-2" 
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
                <line x1="5" y1="12" x2="19" y2="12" />{" "}
                <line x1="5" y1="12" x2="11" y2="18" />{" "}
                <line x1="5" y1="12" x2="11" y2="6" />
              </svg>&nbsp; Back to Previous page
            </button>
            <Link href="/" passHref>
              <button className="mt-5 rounded bg-black p-3 font-medium text-gray hover:bg-opacity-90 flex">
              <svg className="h-6 w-6 text-red-500"  width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <rect x="10" y="12" width="4" height="4" /></svg>
              &nbsp;&nbsp;Go to Homepage
              </button>
            </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
