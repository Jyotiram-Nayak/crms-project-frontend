import { Metadata } from "next";
import UpdateProfile from "@/components/Pages/UpdateProfile";

export const metadata: Metadata = {
  title: "Edit Profile",
  description:
    "Edit Profile page",
};

const page = () => {
  return <UpdateProfile />;
};

export default page;
