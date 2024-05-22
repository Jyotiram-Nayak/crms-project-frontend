import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import DarkModeSwitcher from "../Header/DarkModeSwitcher";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/lib/UserSlice/UserSlice";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User>();
  const state = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const newuser = state.user;
    setUser(newuser);
    console.log("user", newuser);
  }, []);
  const role = getCookie("role");

  const handleToggleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await dispatch(logout());
  };
  return (
    <>
      <nav className=" bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
        {role && (
          <div className="bg-graydark flex justify-between p-2 px-7 text-white">
            <div className="flex space-x-2">
              <div>
                {user?.firstName + " "} {user?.lastName}
              </div>
              <div>{" | "}</div>
              <div>{user?.email}</div>
            </div>
            <div className="flex items-center space-x-1" onClick={handleLogout}>
              <div>Logout </div>
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
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />{" "}
                <path d="M7 12h14l-3 -3m0 6l3 -3" />
              </svg>
            </div>
          </div>
        )}
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="dark:bg-white flex items-center rounded  space-x-3 rtl:space-x-reverse"
          >
            <Image
              width={210}
              height={100}
              src={"/logo-png/logo-black-transparent.png"}
              alt="Logo"
              priority
            />
          </Link>
          <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
            <DarkModeSwitcher />
            {role == null && (
              <Link
                href={"/auth/signin"}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </Link>
            )}
            <button
              onClick={handleToggleClick}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${isMenuOpen ? "flex" : "hidden"} w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none w-full">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
              {role != null && (
                <li>
                  <Link
                    href="/dashboard"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
