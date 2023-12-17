"use client";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const HeaderDashboard = () => {
  const [showDiv, setShowDiv] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const userData = {
    username,
    email,
  };

  const handleSignOut = async () => {
    try {
      // const response = await fetch(
      //   "https://api.shardmind.io/api/v1/auth/logout",
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      localStorage.removeItem("token");
      localStorage.removeItem("email");
      toast("Successfully logged out", {
        theme: "dark",
      });
      window.location.href = "/authentication/signin";
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className=" w-full flex items-center justify-between h-16 fixed z-20 bg-[#0c051f]">
      <div className="flex items-center justify-center pl-3 border-none">
        <Link href="/dashboard/personalfeed">
          <img
            className="object-contain md:h-10 w-fit"
            src="https://i.ibb.co/ZY7Jvzk/logo2.png"
          />
        </Link>
      </div>
      <div className="flex justify-between items-center h-14 header-right ml-2 mr-5">
        <ul className="flex items-center">
          <li className="flex justify-center items-center">
            <FontAwesomeIcon
              icon={faBitcoin}
              className="text-[#ec58f6] w-5 h-5"
            />
            <span className="ml-1 text-sm lg:text-lg">250</span>
          </li>
          <li>
            <button className="bg-gradient-to-r from-pink-500 to-violet-500 px-2 md:px-3 py-1 md:py-2 mx-5 rounded-lg text-sm">
              Upgrade
            </button>
          </li>
          <li className="relative">
            <div className="w-7 lg:w-10 h-7 lg:h-10 object-fit">
              <img
                onClick={() => setShowDiv(!showDiv)}
                className="rounded-full"
                src={session?.user?.image || "https://i.ibb.co/QcK63FR/1.jpg"}
                alt=""
              />
            </div>
            {/* users card */}
            <div
              className={`transition-transform duration-300 ease-in-out transform ${
                showDiv ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {showDiv && (
                <div className="bg-gradient-to-r from-pink-500 to-violet-500 absolute right-0 my-5 p-3 rounded-md flex flex-col justify-center items-center mx-auto w-56">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user?.image || "https://i.ibb.co/QcK63FR/1.jpg"}
                    alt=""
                  />

                  <p className="text-sm lg:text-md font-semibold text-white">
                    {user?.name || userData?.username}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-300">
                    {user?.email || userData?.email}
                  </p>
                  {userData ? (
                    <>
                      <button
                        onClick={handleSignOut}
                        className={`${session ? 'hidden' : 'block'} bg-violet-500 text-white uppercase text-sm px-2 py-1 rounded-md mt-2`}
                      >
                        Sign Out
                      </button>
                      <button
                        onClick={() => signOut()}
                        className={`${
                          session ? "block" : "hidden"
                        } bg-violet-500 text-white uppercase text-sm px-2 py-1 rounded-md mt-2`}
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link href="/authentication/signin">
                      <button className="bg-violet-500 text-white uppercase text-sm px-2 py-1 rounded-md mt-2">
                        Sign In
                      </button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </li>
        </ul>
        <ToastContainer />
      </div>
    </div>
  );
};

export default HeaderDashboard;
