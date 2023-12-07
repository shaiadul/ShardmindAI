import React from "react";

const page = () => {
  return (
    <section className="container mx-auto">
      <div class="bg-[#b14bf4] absolute top-0 left-0 bg-gradient-to-tl from-gray-900 via-gray-900 to-[#b14bf4] bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <div class="relative   min-h-screen  sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl">
        <div class="flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10">
          <div class="self-start hidden lg:flex flex-col  text-gray-300">
            <h1 class="my-3 font-semibold text-4xl">Welcome back</h1>
            <p class="pr-3 text-sm opacity-75">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <div class="flex justify-center self-center  z-10">
          <div class="p-12 bg-white mx-auto rounded-3xl w-96 ">
            <div class="mb-7">
              <h3 class="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p class="text-gray-400">
                Do not have an account?{" "}
                <a
                  href="#"
                  class="text-sm text-purple-700 hover:text-purple-700"
                >
                  Sign Up
                </a>
              </p>
            </div>
            <div class="space-y-6">
              <div class="">
                <input
                  class=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type=""
                  placeholder="Email"
                />
              </div>

              <div class="relative" x-data="{ show: true }">
                <input
                  placeholder="Password"
                  type="show ? 'password' : 'text'"
                  class="text-sm text-gray-200 px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                />
                <div class="flex items-center absolute inset-y-0 right-0 mr-3  text-sm leading-5"></div>
              </div>

              <div class="flex items-center justify-between">
                <div class="text-sm ml-auto">
                  <a href="#" class="text-purple-700 hover:text-purple-600">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full flex justify-center bg-purple-800  hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                >
                  Sign in
                </button>
              </div>
              <div class="flex items-center justify-center space-x-2 my-5">
                <span class="h-px w-16 bg-gray-100"></span>
                <span class="text-gray-300 font-normal">or</span>
                <span class="h-px w-16 bg-gray-100"></span>
              </div>
              <div class="flex justify-center gap-5 w-full ">
                <button
                  type="submit"
                  class="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500"
                >
                  <svg
                    class="w-4 mr-2"
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
            <div class="mt-7 text-center text-gray-300 text-xs">
              <span>
                Copyright © 2021-2023
                <a
                  href="#"
                  rel=""
                  target="_blank"
                  title="Codepen aji"
                  class="text-purple-500 hover:text-purple-600 "
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

export default page;
