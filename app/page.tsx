import Dashboard from "@/components/Dashboard/dashboard";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Next.js Dashboard | CareerForge - Next.js Dashboard",
  description: "This is Next.js Home for CareerForge Dashboard",
};

export default function Home() {
  return (
    <>
      <ToastContainer/>
        <DefaultLayout>
          <Dashboard />
        </DefaultLayout>
    </>
  );
}
