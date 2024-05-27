import React from "react";
import { TypewriterEffectSmooth } from "./typewriter-effect";
import { getCookie } from "cookies-next";
import Link from "next/link";

const words = [
  {
    text: "Build",
  },
  {
    text: "your",
  },
  {
    text: "career",
  },
  {
    text: "with",
  },
  {
    text: "Career Forge.",
    className: "text-blue-500 dark:text-blue-500",
  },
];
const TypewriterEffect = () => {
  const role = getCookie("role");
  console.log("role",role)
  return (
    <>
    
      <div 
        className="flex flex-col items-center justify-center bg-cover mt-20"
        style={{ height: "40rem",marginTop:"80px" ,backgroundImage:'url("/images/cover/homeImage.jpg")'}}>
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
          <strong>The best way to predict your future is to create it.</strong>
        </p>
        <TypewriterEffectSmooth words={words} />
        {role == null && (
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <Link href={"/auth/signin"}>
              <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
                Login now
              </button>
            </Link>
            <Link href={"/auth/signup"}>
              <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
                Create account
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default TypewriterEffect;
