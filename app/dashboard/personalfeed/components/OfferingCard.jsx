import React from "react";
import { motion } from "framer-motion";

const Offering = () => {
  // ---------------------------
  // Farmer motion
  // ---------------------------
  const variant = {
    hidden: { opacity: 0, scale: 0.9, },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileHover={{ scale: 1 }}
      animate="visible"
      transition={{ duration: 1, ease: "easeInOut"}}
      className="max-w-2xl mx-auto"
    >
      <div className="shadow-md border-gray-200 rounded-lg max-w-sm bg-transparent">
        <a href="#">
          <img
            className="rounded-lg"
            src="https://flowbite.com/docs/images/blog/image-1.jpg"
            alt=""
          />
        </a>
        <div className="py-5">
          <a href="#">
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
          </a>
          <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <a
            href="#"
            className="group text-white btn_color_gradient hover:opacity-90 duration-500 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center "
          >
            Read more
            <svg
              className="-mr-1 ml-2 h-4 w-4 group-hover:translate-x-1 duration-700"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Offering;
