import React from "react";
import StepsWaterMark from "./stepswateratermark";

const page = () => {
  return (
    <section className="md:mx-5 my-10">
      <div className="flex justify-center">
        <span className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FD5261] to-[#AA26B6]">
          Object Removal
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

export default page;