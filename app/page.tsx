import { Metadata } from "next";
import HomeLayout from "@/components/Layouts/HomeLayout";
import HomePage from "@/components/Home/HomePage";

export const metadata: Metadata = {
  title: "Next.js Dashboard | CareerForge - Next.js Dashboard",
  description: "This is Next.js Home for CareerForge Dashboard",
};

export default function Home() {
  return (
    <>
        <HomeLayout>
          <HomePage/>
        </HomeLayout>
    </>
  );
}
