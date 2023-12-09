import React from "react";
import DrawingCanvasTest from "../components/drawingcanvas";

const page = () => {
  return (
    <section className="md:mx-5 my-10">
      <div className="flex justify-center">
        <span className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FD5261] to-[#AA26B6]">
          Object Background
        </span>
      </div>

      <div className="flex justify-center">
        <p className="my-10 border-b-2 inline-block cursor-pointer">
          How to Use
        </p>
      </div>
      <DrawingCanvasTest />
    </section>
  );
};

export default page;
