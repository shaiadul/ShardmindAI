import React from "react";
import Offering from "./OfferingCard";

const page = () => {

  

  const preimages = [
    "https://source.unsplash.com/random/300x300/?1",
    "https://source.unsplash.com/random/300x300/?2",
    "https://source.unsplash.com/random/300x300/?3",
    "https://source.unsplash.com/random/300x300/?4",
    "https://source.unsplash.com/random/300x300/?5",
    "https://source.unsplash.com/random/300x300/?6",
    "https://source.unsplash.com/random/300x300/?7",
    "https://source.unsplash.com/random/300x300/?8",
    "https://source.unsplash.com/random/300x300/?9",
    "https://source.unsplash.com/random/300x300/?10",
    "https://source.unsplash.com/random/300x300/?11",
    "https://source.unsplash.com/random/300x300/?12",
    "https://source.unsplash.com/random/300x300/?13",
    "https://source.unsplash.com/random/300x300/?14",
    "https://source.unsplash.com/random/300x300/?15",
    "https://source.unsplash.com/random/300x300/?16",
    "https://source.unsplash.com/random/300x300/?17",
    "https://source.unsplash.com/random/300x300/?18",
    "https://source.unsplash.com/random/300x300/?19",
    "https://source.unsplash.com/random/300x300/?20",
  ];
  return (
    <section className="md:mx-5 my-10">
      <span className="bg-clip-text text-4xl font-bold text-transparent bg-gradient-to-r from-[#FD5261] to-[#AA26B6]">
        Featured Model
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10">
        <Offering />
        <Offering />
        <Offering />
        <Offering />
      </div>

      <div className="mt-20 mb-10">
        <span className="bg-clip-text text-4xl font-bold text-transparent bg-gradient-to-r from-[#FD5261] to-[#AA26B6]">
          Recent Creations
        </span>
        <div className="my-10">
          <div className="flex flex-col justify-center mx-auto">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
              {preimages.map((image, index) => (
                <img
                  key={index}
                  className="object-cover w-full h-60 aspect-square grayscale hover:filter-none duration-500"
                  src={image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
