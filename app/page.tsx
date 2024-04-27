import Dashboard from "@/components/Dashboard/dashboard";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Dashboard | CareerForge - Next.js Dashboard",
  description: "This is Next.js Home for CareerForge Dashboard",
};

export default function Home() {
  return (
    <>
        <DefaultLayout>
          <Dashboard />
        </DefaultLayout>
    </>
  );
}
