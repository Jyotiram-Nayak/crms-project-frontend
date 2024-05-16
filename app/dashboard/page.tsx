"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getCookie } from "cookies-next";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import UniversityDashboard from "@/components/Dashboard/UniversityDashboard";
import CompanyDashboard from "@/components/Dashboard/CompanyDashboard";
import StudentDashboard from "@/components/Dashboard/StudentDashboard";

const Home=()=> {
  const role = getCookie("role")
  console.log("Role dashboard:",role)
  return (
    <>
        <DefaultLayout>
          {role == "Admin" && <AdminDashboard/>}
          {role == "University" && <UniversityDashboard/>}
          {role == "Company" && <CompanyDashboard/>}
          {role == "Student" && <StudentDashboard/>}
        </DefaultLayout>
    </>
  );
}
export default Home