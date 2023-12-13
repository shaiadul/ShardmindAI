"use client";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const HeaderDashboard = () => {
  const [showDiv, setShowDiv] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className=" w-full flex items-center justify-between h-16 fixed z-20 bg-[#0c051f]">
      <div className="flex items-center justify-center pl-3 border-none">
        <Link href="/dashboard/personalfeed">
          <img
            className="object-contain md:h-10 w-fit"
            src="https://i.ibb.co/ZY7Jvzk/logo2.png"
          />
        </Link>
      </div>
      <div className="flex justify-between items-center h-14 header-right ml-2 mr-5">
        <ul className="flex items-center">
          <li className="flex justify-center items-center">
            <FontAwesomeIcon
              icon={faBitcoin}
              className="text-[#ec58f6] w-5 h-5"
            />
            <span className="ml-1 text-sm lg:text-lg">250</span>
          </li>
          <li>
            <button className="bg-gradient-to-r from-pink-500 to-violet-500 px-2 md:px-3 py-1 md:py-2 mx-5 rounded-lg text-sm">
              Upgrade
            </button>
          </li>
          <li className="relative">
            <div className="w-7 lg:w-10 h-7 lg:h-10 object-fit">
              <img
                onClick={() => setShowDiv(!showDiv)}
                className="rounded-full"
                src={session?.user?.image || "https://i.ibb.co/QcK63FR/1.jpg"}
                alt=""
              />
            </div>
            {/* users card */}
            <div
              className={`transition-transform duration-300 ease-in-out transform ${
                showDiv ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {showDiv && (
                <div className="bg-gradient-to-r from-pink-500 to-violet-500 absolute right-0 my-5 p-3 rounded-md flex flex-col justify-center items-center mx-auto">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user?.image}
                    alt=""
                  />

                  <p className="text-sm lg:text-md font-semibold text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-300">
                    {user?.email}
                  </p>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderDashboard;
