"use client";
import { UserAuth } from "@/components/authprovider/AuthContext";
import { faImage, faObjectGroup } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import {
  faBars,
  faGear,
  faHome,
  faQuestion,
  faSignIn,
  faSignOut,
  faVideo,
  faWaterLadder,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderDashboard = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [showAside, setShowAside] = useState(false);
  const [userData, setUserData] = useState({ username: "", email: "" });
  const { user, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

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

  // ---------------------------
  // Farmer motion
  // ---------------------------
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%",},
  };

  return (
    <div className=" w-full flex items-center justify-between h-16 fixed z-20 bg-[#0c051f]">
      <div className="flex items-center justify-center pl-3 border-none">
        <Link href="/dashboard/personalfeed">
          <img
            className="hidden md:block object-contain md:h-10 w-fit"
            src="https://i.ibb.co/ZY7Jvzk/logo2.png"
            alt="logo"
          />
          <img
            className="md:hidden object-contain h-10 w-10"
            src="https://i.ibb.co/Wtdt1JQ/Shardmindlogo.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex justify-between items-center h-14 header-right ml-2 mr-5">
        <ul className="flex items-center">
          <li className="flex justify-center items-center">
            {/* <FontAwesomeIcon
              icon={faNfcDirectional}
              className="text-[#ec58f6] w-5 h-5 mr-1"
            /> */}
            <img
              className="w-10 h-10 mb-1"
              src="https://i.ibb.co/Y7Dr4Nj/Screenshot-2024-01-02-011945-removebg-preview.png"
              alt="icon"
            />

            <span className="ml-1 text-sm lg:text-lg">250</span>
          </li>
          <li>
            <button className="btn_color_gradient hover:opacity-90 duration-500 px-2 md:px-3 py-1 md:py-2 mx-5 rounded-lg text-sm">
              Upgrade
            </button>
          </li>
          <li className="relative">
            <div className="w-7 lg:w-10 h-7 lg:h-10 object-fit">
              <img
                onClick={() => setShowDiv(!showDiv)}
                className="rounded-full cursor-pointer"
                src={user?.photoURL || "https://i.ibb.co/QcK63FR/1.jpg"}
                alt="user picture"
              />
            </div>
            {/* users card */}
            <motion.div
              // className={`transition-transform duration-300 ease-in-out transform ${
              //   showDiv ? "translate-x-0" : "translate-x-full"
              // }`}
              initial={false}
              animate={showDiv ? "open" : "closed"}
              variants={variants}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {showDiv && (
                <div className="bg_color_gradient absolute right-0 my-5 p-3 rounded-md flex flex-col justify-center items-center mx-auto w-56 transition-all">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user?.photoURL || "https://i.ibb.co/QcK63FR/1.jpg"}
                    alt=""
                  />

                  <p className="text-sm lg:text-md font-semibold text-white">
                    {user?.displayName || userData?.username}
                  </p>
                  <p className="text-xs lg:text-sm mt-1 text-gray-200">
                    {user?.email || userData?.email}
                  </p>
                  <div className="flex flex-col justify-center items-center ">
                    {userData || user ? (
                      <>
                        <button
                          onClick={handleSignOut}
                          className={`${
                            user ? "hidden" : "block"
                          } group btn_color_gradient hover:scale-105 duration-500 text-white uppercase text-sm px-2 py-1 rounded-md mt-2 w-full`}
                        >
                          <FontAwesomeIcon
                            icon={faSignOut}
                            className="group-hover:rotate-90 duration-500 w-4 h-4 mr-1"
                          />
                          Sign Out
                        </button>
                        <button
                          onClick={() => handleGoogleSignOut()}
                          className={`${
                            user ? "block" : "hidden"
                          } group btn_color_gradient hover:scale-105 duration-500 text-white uppercase text-sm px-2 py-1 rounded-md mt-2 w-full`}
                        >
                          <FontAwesomeIcon
                            icon={faSignOut}
                            className="w-4 h-4 mr-1"
                          />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <Link href="/authentication/signin">
                        <button className="group btn_color_gradient hover:scale-105 duration-500 text-white uppercase text-sm px-2 py-1 rounded-md mt-2 w-full">
                          <FontAwesomeIcon
                            icon={faSignIn}
                            className="w-4 h-4 mr-1"
                          />
                          Sign In
                        </button>
                      </Link>
                    )}

                    <button className="group btn_color_gradient hover:scale-105 duration-500 text-white uppercase text-sm px-2 py-1 rounded-md mt-2 w-full">
                      <FontAwesomeIcon
                        icon={faQuestion}
                        className="group-hover:rotate-[360deg] duration-700 w-4 h-4 mr-1"
                      />{" "}
                      FAQ & Support
                    </button>
                    <button className="group btn_color_gradient hover:scale-105 duration-500 text-white uppercase text-sm px-2 py-1 rounded-md mt-2 w-full flex justify-center content-center">
                      <FontAwesomeIcon
                        icon={faGear}
                        className="group-hover:rotate-90 duration-500 w-4 h-4 mr-1"
                      />{" "}
                      Settings
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </li>
          <li>
            <FontAwesomeIcon
              onClick={() => setShowAside(!showAside)}
              icon={showAside ? faXmark : faBars}
              className="text-white hover:text-pink-500 w-5 h-5 ml-4 block md:hidden "
            />
            {/* show aside */}
            <div
              className={`transition-transform duration-300 ease-in-out transform ${
                showAside ? "translate-x-0" : "translate-x-full"
              } `}
            >
              {showAside && (
                <div className="bg-[#0c051f] absolute -right-5 my-5 p-3 flex flex-col justify-start items-center mx-auto w-60 h-[100vh]">
                  <ul>
                    <li>
                      <Link
                        href="/dashboard/personalfeed"
                        className={`focus-within:bg-slate-600 relative flex flex-row items-center h-11 focus:outline-none text-white-600 hover:text-white-800 pr-6 rounded-md`}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <FontAwesomeIcon
                            icon={faHome}
                            className="text-[#C61FA2] w-5 h-5"
                          />
                        </span>
                        <span className="ml-2 text-md tracking-wide truncate">
                          Personal Feed
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/backgroundremoval"
                        className={`focus-within:bg-slate-600 relative flex flex-row items-center h-11 focus:outline-none  text-white-600 hover:text-white-800 pr-6 rounded-md`}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <FontAwesomeIcon
                            icon={faImage}
                            className="text-[#C61FA2] w-5 h-5"
                          />
                        </span>
                        <span className="ml-2 text-md tracking-wide truncate">
                          Background Removal
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/watermarkremoval"
                        className={`focus-within:bg-slate-600 relative flex flex-row items-center h-11 focus:outline-none text-white-600 hover:text-white-800 pr-6 rounded-md`}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <FontAwesomeIcon
                            icon={faWaterLadder}
                            className="text-[#C61FA2] w-5 h-5"
                          />
                        </span>
                        <span className="ml-2 text-md tracking-wide truncate">
                          Watermark Removal
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/objectremoval"
                        className={`focus-within:bg-slate-600 relative flex flex-row items-center h-11 focus:outline-none text-white-600 hover:text-white-800 pr-6 rounded-md`}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <FontAwesomeIcon
                            icon={faObjectGroup}
                            className="text-[#C61FA2] w-5 h-5"
                          />
                        </span>
                        <span className="ml-2 text-md tracking-wide truncate">
                          Object Removal
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/videosegmentation"
                        className={`focus-within:bg-slate-600 relative flex flex-row items-center h-11 focus:outline-none text-white-600 hover:text-white-800 pr-6 rounded-md`}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <FontAwesomeIcon
                            icon={faVideo}
                            className="text-[#C61FA2] w-5 h-5"
                          />
                        </span>
                        <span className="ml-2 text-md tracking-wide truncate">
                          Video Segmentation
                        </span>
                      </Link>
                    </li>
                  </ul>
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
