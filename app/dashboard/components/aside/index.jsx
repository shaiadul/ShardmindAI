"use client";
import { faImage, faObjectGroup } from "@fortawesome/free-regular-svg-icons";
import {
  faHome,
  faVideo,
  faWaterLadder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import React from "react";

const AsideDashboard = () => {
  const pathname = usePathname()
  
  return (
    <div className="fixed hidden md:flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 h-full transition-all duration-300 border-none z-10 sidebar ">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow ">
        <ul className="flex flex-col py-4 space-y-1">
          <li>
            <Link
              href="/dashboard/personalfeed"
              className={` ${pathname == '/dashboard/personalfeed' ? 'bg-slate-600' : ''} relative flex flex-row items-center h-11 focus:outline-none text-white-600 hover:text-white-800 pr-6 rounded-md`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FontAwesomeIcon
                  icon={faHome}
                  className="text-[#C61FA2] w-5 h-5"
                />
              </span>
              <span className="ml-2 text-md font-semibold tracking-wide truncate">
                Personal Feed
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/backgroundremoval"
              className={`${pathname == '/dashboard/backgroundremoval' ? 'bg-slate-600' : ''} relative flex flex-row items-center h-11 focus:outline-none  text-white-600 hover:text-white-800 pr-6 rounded-md`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FontAwesomeIcon
                  icon={faImage}
                  className="text-[#C61FA2] w-5 h-5"
                />
              </span>
              <span className="ml-2 text-md font-semibold tracking-wide truncate">
                Background Removal
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/watermarkremoval"
              className={`${pathname == '/dashboard/watermarkremoval' ? 'bg-slate-600' : ''} relative flex flex-row items-center h-11 focus:outline-none text-white-600 hover:text-white-800 pr-6 rounded-md`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FontAwesomeIcon
                  icon={faWaterLadder}
                  className="text-[#C61FA2] w-5 h-5"
                />
              </span>
              <span className="ml-2 text-md font-semibold tracking-wide truncate">
                Watermark Removal
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/objectremoval"
              className={`${pathname == '/dashboard/objectremoval' ? 'bg-slate-600' : ''} relative flex flex-row items-center h-11 focus:outline-none text-white-600 hover:text-white-800 pr-6 rounded-md`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FontAwesomeIcon
                  icon={faObjectGroup}
                  className="text-[#C61FA2] w-5 h-5"
                />
              </span>
              <span className="ml-2 text-md font-semibold tracking-wide truncate">
                Object Removal
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/videosegmentation"
              className={`${pathname == '/dashboard/videosegmentation' ? 'bg-slate-600' : ''} relative flex flex-row items-center h-11 focus:outline-none text-white-600 hover:text-white-800 pr-6 rounded-md`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FontAwesomeIcon
                  icon={faVideo}
                  className="text-[#C61FA2] w-5 h-5"
                />
              </span>
              <span className="ml-2 text-md font-semibold tracking-wide truncate">
                Video Segmentation
              </span>
            </Link>
          </li>
        </ul>

        {/* <option value="">Gulf Medical Center</option>
        <option value="">Gulshan Medicare-Dhaka</option>
        <option value="">Medinova Medical Service</option>

 */}


        <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
          Copyright @2023 Shardmind
        </p>
      </div>
    </div>
  );
};

export default AsideDashboard;
