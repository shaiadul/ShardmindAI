"use client";
import React from "react";
import StepsVideo from "./components/stepsvideo";

const VideoSegmentation = () => {
  return (
    <section className="mx-5 my-10">
      <div className="flex justify-center">
        <span className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FD5261] to-[#AA26B6]">
          Image Segmentation Removal
        </span>
      </div>

      <div className="flex justify-center">
        <p className="my-10 border-b-2 inline-block cursor-pointer">
          How to Use
        </p>
      </div>
      <StepsVideo />
  
    </section>
  );
};

export default VideoSegmentation;
