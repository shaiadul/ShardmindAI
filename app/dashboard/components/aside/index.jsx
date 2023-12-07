import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const AsideDashboard = () => {
  const links = [
    {
      href: "/dashboard/personalfeed",
      label: "Personal Feed",
    },
    {
      href: "/dashboard/personalfeed",
      label: "Personal Feed",
    },
    {
      href: "/dashboard/personalfeed",
      label: "Personal Feed",
    },
    {
      href: "/dashboard/personalfeed",
      label: "Personal Feed",
    },
    {
      href: "/dashboard/personalfeed",
      label: "Personal Feed",
    },
  ];
  return (
    <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 h-full transition-all duration-300 border-none z-10 sidebar ">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 pr-6 rounded-md"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FontAwesomeIcon
                    icon={faHome}
                    className="text-[#C61FA2] w-5 h-5"
                  />
                </span>
                <span className="ml-2 text-md font-semibold tracking-wide truncate">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
          Copyright @2023 Shardmind
        </p>
      </div>
    </div>
  );
};

export default AsideDashboard;