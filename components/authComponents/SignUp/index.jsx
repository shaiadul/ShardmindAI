"use client";
import React, { useState } from "react";
import Animation from "@/components/animation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserAuth } from "@/components/authprovider/AuthContext";
import { useRouter } from "next/navigation";

const SignUp = () => {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, googleSignIn } = UserAuth();

  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const data = {
        username,
        email,
        password,
        role: "SH",
      };
      const response = await fetch(
        "https://api.shardmind.io/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast("Please check your email", {
          theme: "dark",
        });
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
        router.push("/dashboard/personalfeed");
      } else {
        toast(`Something went wrong!`, {
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast("Successfully logged in", {
        theme: "dark",
      });
      router.push("/dashboard/personalfeed");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="container mx-auto">
      <div className="absolute top-0 left-0 bg-gradient-to-tl from-gray-900 via-[#2b1a48] to-[#d53a9d] bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <Animation />
      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent p-3">
        <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10">
          <div className="self-start hidden lg:flex flex-col  text-gray-300">
            <h1 className="my-3 font-semibold text-4xl">Welcome back</h1>
            <p className="pr-3 text-sm opacity-75">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center self-center z-10 mt-10 md:mt-0 lg:mt-0 xl:mt-0">
          <div className="p-8 bg-white mx-auto rounded-3xl w-96 ">
            <div className="mb-7">
              <h3 className="font-semibold font-serif text-2xl text-gray-800">
                Sign Up{" "}
              </h3>
              <p className="text-gray-400">
                Already have an account?{" "}
                <a
                  href="/authentication/signin"
                  className="text-sm text-[#b14bf4] hover:opacity-75"
                >
                  Sign In
                </a>
              </p>
            </div>
            <div className="space-y-6 text-gray-400">
              <div>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-[#b14bf4] transition-colors"
                  type="text"
                  placeholder="Username"
                />
              </div>

              <div className="">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-[#b14bf4] transition-colors"
                  type="email"
                  placeholder="Email"
                />
              </div>

              <div className="relative" x-data="{ show: true }">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                />
                <div
                  onClick={toggleShowPassword}
                  className="flex items-center absolute inset-y-0 right-0 mr-3  text-sm leading-5"
                >
                  {showPassword ? "hide" : "show"}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm ml-auto">
                  <Link
                    href="/authentication/forgotpassword"
                    className="text-[#b14bf4] hover:opacity-75"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  onClick={handleSignUp}
                  className="w-full flex justify-center bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-gradient-to-l text-gray-100 p-3 rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                >
                  Sign Up
                </button>
              </div>
              <div className="flex items-center justify-center space-x-2 my-5">
                <span className="h-px w-16 bg-gray-100"></span>
                <span className="text-gray-300 font-normal">or</span>
                <span className="h-px w-16 bg-gray-100"></span>
              </div>
              <div className="flex justify-center gap-5 w-full ">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:bg-gray-600 text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500"
                >
                  <svg
                    className="w-4 mr-2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#EA4335"
                      d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                    />
                  </svg>

                  <span>Google</span>
                </button>
              </div>
            </div>
            <div className="mt-7 text-center text-gray-300 text-xs">
              <span>
                Copyright © 2021-2023
                <a
                  href="#"
                  rel=""
                  target="_blank"
                  title=""
                  className="text-[#b14bf4] hover:opacity-75 pl-1"
                >
                  SHARDMIND
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default SignUp;
