"use client";
import { UserAuth } from "@/components/authprovider/AuthContext";
import { faNfcDirectional } from "@fortawesome/free-brands-svg-icons";
import {
  faGear,
  faQuestion,
  faSignIn,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderDashboard = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [userData, setUserData] = useState({ username: "", email: "" });
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

 

  console.log(user);

  const handleGoogleSignOut = async () => {
    try {
      await logOut();
      toast("Successfully logged out", {
        theme: "dark",
      });
      router.push("/authentication/signin");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

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
      router.push("/authentication/signin");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { localStorage } = window;
      setUserData((prev) => {
        return {
          ...prev,
          username: localStorage.getItem("username"),
          email: localStorage.getItem("email"),
        };
      });
    }
  }, []);

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
              icon={faNfcDirectional}
              className="text-[#ec58f6] w-5 h-5 mr-1"
            />
            <span className="ml-1 text-sm lg:text-lg">250</span>
          </li>
          <li>
            <button className="bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-gradient-to-l px-2 md:px-3 py-1 md:py-2 mx-5 rounded-lg text-sm">
              Upgrade
            </button>
          </li>
          <li className="relative">
            <div className="w-7 lg:w-10 h-7 lg:h-10 object-fit">
              <img
                onClick={() => setShowDiv(!showDiv)}
                className="rounded-full"
                src={user?.photoURL || "https://i.ibb.co/QcK63FR/1.jpg"}
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
                    src={user?.photoURL || "https://i.ibb.co/QcK63FR/1.jpg"}
                    alt=""
                  />

                  <p className="text-sm lg:text-md font-semibold text-white">
                    {user?.displayName || userData?.username}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-300">
                    {user?.email || userData?.email}
                  </p>
                  <div className="flex flex-col justify-center items-center ">
                    {userData || user ? (
                      <>
                        <button
                          onClick={handleSignOut}
                          className={`${
                            user ? "hidden" : "block"
                          } group bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-gradient-to-l duration-500 text-white uppercase text-sm px-2 py-1 rounded-md mt-2 w-full`}
                        >
                          <FontAwesomeIcon
                            icon={faSignOut}
                            className="group-hover:text-pink-500 w-5 h-5 mr-1"
                          />
                          Sign Out
                        </button>
                        <button
                          onClick={() => handleGoogleSignOut()}
                          className={`${
                            user ? "block" : "hidden"
                          } group bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-gradient-to-l duration-500 text-white uppercase text-sm px-2 py-1 rounded-md mt-2 w-full`}
                        >
                          <FontAwesomeIcon
                            icon={faSignOut}
                            className="group-hover:text-pink-500 w-5 h-5 mr-1"
                          />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <Link href="/authentication/signin">
                        <button className="group bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-gradient-to-l duration-500 text-white uppercase text-sm px-2 py-1 rounded-md mt-2 w-full">
                          <FontAwesomeIcon
                            icon={faSignIn}
                            className="group-hover:text-pink-500 w-5 h-5 mr-1"
                          />
                          Sign In
                        </button>
                      </Link>
                    )}

                    <button className="group bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-gradient-to-l duration-500 text-white uppercase text-sm px-2 py-1 rounded-md mt-2 w-full">
                      <FontAwesomeIcon
                        icon={faQuestion}
                        className="group-hover:text-pink-500 w-5 h-5"
                      />{" "}
                      FAQ & Support
                    </button>
                    <button className="group bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-gradient-to-l duration-500 text-white uppercase text-sm px-2 py-1 rounded-md mt-2 w-full">
                      <FontAwesomeIcon
                        icon={faGear}
                        className="group-hover:text-pink-500 w-5 h-5"
                      />{" "}
                      FAQ & Support
                    </button>
                  </div>
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
