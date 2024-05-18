"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DateFilter } from "@/components/Filters/DateFilter/DateFilter";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  role: string;
  website: string;
  bio: string;
  image: string;
  isApproved: boolean;
  createOn: string;
  updateOn: string | null;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  const state = useSelector((stete: any) => stete.user);
  const users = state?.user;
  console.log("user from redux :", users);
  const fetchData = async () => {
    users && setUser(users)
    users ?? console.log("user not found")
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-15rem md:h-65">
            <div className="absolute inset-0">
              <Image
                src={"/images/cover/cover-01.png"}
                alt="profile cover"
                className="w-full h-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                layout="fill"
                priority
              />
            </div>
          </div>

          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto mt-0 sm:-mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <Image
                  src={
                    user?.image ? user.image : "/images/user/profile-image.jpg"
                  }
                  width={160}
                  height={160}
                  style={{
                    borderRadius: "50%",
                    width: "auto",
                    height: "auto",
                  }}
                  alt="profile"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {`${user?.firstName} ${user?.lastName}`}
              </h3>
              <p className="font-medium">{user?.role.toUpperCase()}</p>
              <div className="my-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Contact Information */}
                  <div className="bg-gray border-4 border-stroke dark:bg-form-input dark:border-form-strokedark p-6 rounded-sm shadow-switcher overflow-x-auto">
                    <h2 className="text-lg font-semibold mb-4">
                      Contact Information
                    </h2>
                    <div className="flex items-center mb-4 space-x-3">
                      <div className="text-left">
                        <p className="text-gray-600 min-w-[150px]">Phone Number</p>
                        <p className="text-gray-600 min-w-[150px]">Email</p>
                        <p className="text-gray-600 min-w-[150px]">Address</p>
                        <p className="text-gray-600 min-w-[150px]">City</p>
                        <p className="text-gray-600 min-w-[150px]">State</p>
                      </div>
                      <div className="text-left">
                        <p className="text-gray-600 min-w-[150px]">{user?.phoneNumber}</p>
                        <p className="text-gray-600 min-w-[150px]">{user?.email}</p>
                        <p className="text-gray-600 min-w-[150px]">{user?.address}</p>
                        <p className="text-gray-600 min-w-[150px]">{user?.city}</p>
                        <p className="text-gray-600 min-w-[150px]">{user?.state}</p>
                      </div>
                    </div>
                    <div className="flex text-left">
                      <p className="text-gray-600">
                        visit Website :{" "}
                        <Link
                          className="text-blue-500 dark:text-blue-300 hover:underline"
                          href={user?.website ?? ""}
                          target="blanck"
                        >
                          {user?.website}
                        </Link>
                      </p>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="bg-gray border-4 border-stroke dark:bg-form-input dark:border-form-strokedark p-6 rounded-sm shadow-switcher overflow-x-auto">
                    <h2 className="text-lg font-semibold mb-4">
                      Account Information
                    </h2>
                    <div className="flex items-center mb-4 space-x-3">
                      <div className="text-left">
                        <p className="text-gray-600 min-w-[150px]">Role</p>
                        <p className="text-gray-600 min-w-[150px]">Member Since</p>
                        {user?.updateOn && (<p className="text-gray-600 min-w-[150px]">Last Updated</p>)}
                      </div>
                      <div className="text-left">
                        <p className="text-gray-600 min-w-[150px]">
                          {user?.role}
                        </p>
                        <p className="text-gray-600 min-w-[150px]">
                          {user?.createOn ? DateFilter(user.createOn) : ""}
                        </p>
                        {user?.updateOn && (
                          <p className="text-gray-600 min-w-[150px]">
                            {user?.updateOn ? DateFilter(user.updateOn) : ""}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {user && user.bio && (
                <div className="mx-auto max-w-180">
                  <h4 className="font-semibold text-black dark:text-white">
                    About Me
                  </h4>
                  <p className="mt-4.5">{user && user.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
