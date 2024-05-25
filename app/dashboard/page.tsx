"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getCookie } from "cookies-next";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import UniversityDashboard from "@/components/Dashboard/UniversityDashboard";
import CompanyDashboard from "@/components/Dashboard/CompanyDashboard";
import StudentDashboard from "@/components/Dashboard/StudentDashboard";
import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader";

const DynamicAdminDashboard = dynamic(
  () => import("@/components/Dashboard/AdminDashboard"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const Home = () => {
  const role = getCookie("role");
  console.log("Role dashboard:", role);
  return (
    <>
      <DefaultLayout>
        {role == "Admin" && <DynamicAdminDashboard />}
        {role == "University" && <UniversityDashboard />}
        {role == "Company" && <CompanyDashboard />}
        {role == "Student" && <StudentDashboard />}
      </DefaultLayout>
    </>
  );
};
export default Home;
