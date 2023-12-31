"use client";
import Animation from "@/components/animation";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <section className="container mx-auto">
      <div className="bg-[#b14bf4] absolute top-0 left-0 bg-gradient-to-tl from-gray-900 via-[#2b1a48] to-[#d53a9d] bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <Animation />
      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent p-3">
        <div className="flex justify-center items-center self-center z-10 mt-[50%] md:mt-0 lg:mt-0 xl:mt-0">
          <div className="p-8 bg-white mx-auto rounded-3xl w-96 ">
            <div className="mb-7">
              <h3 className="font-semibold font-serif text-2xl text-gray-800">
                Set new password{" "}
              </h3>
            </div>
            <div className="space-y-6 text-gray-400">
              <div className="relative">
                <input
                  placeholder="New Password"
                  type={showNewPassword ? "text" : "password"}
                  className="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                />
                <div
                  onClick={toggleNewPassword}
                  className="flex items-center absolute inset-y-0 right-0 mr-3 text-sm leading-5 cursor-pointer"
                >
                  {showNewPassword ? "hide" : "show"}
                </div>
              </div>

              <div className="relative">
                <input
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  className="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                />
                <div
                  onClick={toggleConfirmPassword}
                  className="flex items-center absolute inset-y-0 right-0 mr-3 text-sm leading-5 cursor-pointer"
                >
                  {showConfirmPassword ? "hide" : "show"}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-gradient-to-l text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                >
                  Confirm Password
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
                  title="Codepen aji"
                  className="text-[#b14bf4] hover:opacity-75 pl-1"
                >
                  SHARDMIND
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
