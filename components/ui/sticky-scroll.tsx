"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";

// const content = [
//   {
//     title: "Collaborative Editing",
//     description:
//       "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
//     content: (
//       <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
//         Collaborative Editing
//       </div>
//     ),
//   },
//   {
//     title: "Real time changes",
//     description:
//       "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
//     content: (
//       <div className="h-full w-full  flex items-center justify-center text-white">
//         <Image
//           src="/linear.webp"
//           width={300}
//           height={300}
//           className="h-full w-full object-cover"
//           alt="linear board demo"
//         />
//       </div>
//     ),
//   },
//   {
//     title: "Version control",
//     description:
//       "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
//     content: (
//       <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
//         Version control
//       </div>
//     ),
//   },
//   {
//     title: "Running out of content",
//     description:
//       "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
//     content: (
//       <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
//         Running out of content
//       </div>
//     ),
//   },
// ];
const content = [
  {
    title: "Campus Management System",
    description:
      "Our Campus Management System provides seamless integration of administrative tasks, student management, academic operations, and more. Simplify the complexities of campus management and streamline your institution's processes with Career Forge.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white">
        Campus Management System
      </div>
    ),
  },
  {
    title: "Student Enrollment",
    description:
      "Efficiently manage student enrollment processes with Career Forge. From admission forms to document submission, our system automates the entire enrollment workflow, ensuring accuracy, speed, and ease of use.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-slate-500 to-cyan-500 flex items-center justify-center text-white">
        Student Enrollment
      </div>
    ),
  },
  {
    title: "Academic Administration",
    description:
      "Simplify academic administration tasks such as course scheduling, faculty management, grading, and more. Career Forge offers comprehensive tools to streamline administrative processes and enhance academic operations.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-rose-500 to-yellow-500 flex items-center justify-center text-white">
        Academic Administration
      </div>
    ),
  },
  {
    title: "Campus Communication",
    description:
      "Facilitate seamless communication within your campus community. Career Forge provides features for announcements, notifications, messaging, and collaboration tools to keep everyone informed and engaged.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white">
        Campus Communication
      </div>
    ),
  },
];

export default function StickyScrollReveal() {
  return (
    <div className="bg-black" >
      <StickyScroll content={content} />
    </div>
  );
}
