"use client";
import { UserAuth } from "@/components/authprovider/AuthContext";
import Animation from "@/components/animation";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, googleSignIn } = UserAuth();

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const response = await fetch(
        "https://api.shardmind.io/api/v1/auth/user/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data?.accessToken);
        
        Cookies.set('jwt', data?.accessToken, );
        localStorage.setItem("id", data?.user?._id);
        
        localStorage.setItem("email", email);
        toast("Successfully logged", {
          theme: "dark",
        });
        router.push("/dashboard/personalfeed");
      } else {
        const errorData = await response.json();
        toast("Enter your valid email and password", {
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
      <div className="absolute bg-[#0C051F] top-0 left-0 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <Animation />
      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent p-3">
        <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md">
          <div className="self-start hidden lg:flex flex-col text-white">
            <h1 className="my-3 font-semibold text-[32px]">Welcome Back</h1>
            <p className="pr-3 text-[15px]">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center self-center z-10 mt-10 md:mt-0 lg:mt-0 xl:mt-0">
          <div className="p-8 bg-white mx-auto rounded-3xl w-96 ">
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p className="text-gray-400">
                Do not have an account?{" "}
                <Link
                  href="/authentication/signup"
                  className="text-[15px] font-bold text-black hover:opacity-75"
                >
                  Sign up
                </Link>
              </p>
            </div>
            <div className="space-y-6 text-gray-400">
              <div className="">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-[#b14bf4] transition-colors"
                  type="email"
                  placeholder="Email"
                  required
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
                  className="flex items-center absolute inset-y-0 right-0 mr-3 cursor-pointer text-sm leading-5"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                    </svg>
                  ) : (
                    <svg
                      className=" w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" />
                    </svg>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm ml-auto">
                  <Link
                    href="/authentication/forgotpassword"
                    className="text-black font-bold hover:opacity-75"
                  >
                    Forgot Password ?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  onClick={handleSignIn}
                  className="w-full flex justify-center btn_color_gradient hover:opacity-80 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                >
                  Sign in
                </button>
              </div>
              <div className="flex items-center justify-center space-x-2 my-5">
                <span className="h-px w-16 bg-black"></span>
                <span className="text-black text-[20px] font-semibold">or</span>
                <span className="h-px w-16 bg-black"></span>
              </div>
              <div className="flex justify-center gap-5 w-full ">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500"
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
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default SignIn;
