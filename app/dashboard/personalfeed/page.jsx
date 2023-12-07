import React from "react";
import Offering from "./OfferingCard";

const page = () => {
  return (
    <section className="md:mx-5 my-10">
    <span className="bg-clip-text text-4xl font-bold text-transparent bg-gradient-to-r from-[#FD5261] to-[#AA26B6]">Featured Model</span>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10">
      <Offering />
      <Offering />
      <Offering />
      <Offering />
    </div>
    </section>
  );
};

export default page;
