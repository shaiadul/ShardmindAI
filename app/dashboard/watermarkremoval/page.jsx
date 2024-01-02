"use client";
import React, { useEffect } from "react";
import StepsWaterMark from "./components/stepswateratermark"
import { useRouter } from "next/navigation";
import { UserAuth } from "@/components/authprovider/AuthContext";

const WatermarkRemoval = () => {
  const router = useRouter();
  const { user } = UserAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { localStorage } = window;
      const guard = localStorage.getItem("token");
      if (!guard && !user) {
        router.push("/authentication/signin");
      }
    }
  }, []);
  return (
    <section className="mx-5 my-10">
      <div className="flex justify-center">
        <span className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FD5261] to-[#AA26B6]">
          WaterMark Removal
        </span>
      </div>

      <div className="flex justify-center">
        <p className="my-10 border-b-2 inline-block cursor-pointer">
          How to Use
        </p>
      </div>
      <StepsWaterMark />
    </section>
  );
};

export default WatermarkRemoval;
