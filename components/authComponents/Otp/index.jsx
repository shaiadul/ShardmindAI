"use client";

import Animation from "@/components/animation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpVerify = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("example@gmail.com");
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [otp, setOtp] = useState("");

  const router = useRouter();

  

  const handleOtpChange = (index, value) => {
    // Update the OTP value
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Move focus to the next input field
    if (index < inputRefs.length - 1 && value !== "") {
      inputRefs[index + 1].current.focus();
    }

    // Log the 4-digit OTP value to the console
    const otpString = newOtpValues.join("");
    if (otpString.length === 4) {
      setOtp(otpString);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(
        "https://api.shardmind.io/api/v1/auth/otp/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
          }),
        }
      );

      if (response.ok) {
        toast(`OTP verification successful !`, {
          theme: "dark",
        });
        router.push("/authentication/signin");
      } else {
        toast.error(`Please input valid otp! if any issues click Resend OTP`, {
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await fetch(
        "https://api.shardmind.io/api/v1/auth/otp/resend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      if (response.ok) {
        toast(`OTP resend successful !`, {
          theme: "dark",
        });
      } else {
        toast(`Something went wrong !`, {
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const expireOtp = async () => {
  //   try {
  //     if (typeof window !== "undefined") {
  //       const { localStorage } = window
  //       const lastCallTime = localStorage.getItem("lastCallTime");
  //       const currentTime = new Date().getTime();

  //       // Check if at least 2 minutes have passed since the last call
  //       if (!lastCallTime || currentTime - lastCallTime > 2 * 60 * 1000) {
  //         const response = await fetch(
  //           "https://api.shardmind.io/api/v1/auth/otp/expire",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               email: email,
  //             }),
  //           }
  //         );

  //         if (response.ok) {
  //           toast(`OTP expired, click resent!`, {
  //             theme: "dark",
  //           });

  //           // Update the last call time in localStorage
  //           localStorage.setItem("lastCallTime", currentTime);
  //           // Schedule the next call after 2 minutes
  //           setTimeout(expireOtp, 2 * 60 * 1000);
  //         } else {
  //           toast(`Something went wrong!`, {
  //             theme: "dark",
  //           });
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // useEffect(() => {
  //   setComponentMounted(true);

  //   if (componentMounted) {
  //     expireOtp();

  //     const intervalId = setInterval(expireOtp, 2 * 60 * 1000);

  //     return () => clearInterval(intervalId);
  //   }
  // }, [componentMounted]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { localStorage } = window;
      setEmail((prev) => (prev = localStorage.getItem("email")));
    }
  }, []);

  return (
    <section className="container mx-auto">
      <div className="absolute top-0 left-0 bg-[#0C051F] bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <Animation />
      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent p-3">
        <div className="flex justify-center items-center self-center z-10 mt-[50%] md:mt-0 lg:mt-0 xl:mt-0">
          <div className="p-8 bg-white mx-auto rounded-3xl w-96 ">
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-gray-800">
                Email Verification{" "}
              </h3>
              <p className="text-gray-400">
                Code has been sent{" "}
                <a
                  mailto="mailto:example@gmail.com"
                  className="text-[15px] text-black font-semibold hover:opacity-75"
                >
                  {email}
                </a>
              </p>
            </div>
            <div className="space-y-6 text-gray-400">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {otpValues.map((value, index) => (
                  <div key={index} className="w-16 h-16">
                    <input
                      ref={inputRefs[index]}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#b14bf4]"
                      type="text"
                      name=""
                      id=""
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <span>
                  Did not recieve code?
                  <span
                    onClick={resendOtp}
                    className="text-black hover:opacity-75 pl-1 cursor-pointer"
                  >
                    Resend
                  </span>
                </span>
              </div>

              <div>
                <button
                  onClick={verifyOtp}
                  className="w-full flex justify-center btn_color_gradient hover:opacity-80 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                >
                  Confirm
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

export default OtpVerify;
