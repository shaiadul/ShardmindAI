import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const HeaderDashboard = () => {
  return (
    <div className=" w-full flex items-center justify-between h-16 fixed bg-black">
      <div className="flex items-center justify-center pl-3 border-none">
        <Link href="/dashboard">
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
            <span className="ml-1">250</span>
          </li>
          <li>
            <button className="bg-gradient-to-r from-pink-500 to-violet-500 px-2 md:px-3 py-1 md:py-2 mx-5 rounded-lg">
              Upgrade
            </button>
          </li>
          <li>
            <div className="w-10 h-10 object-fit">
              <img
                className="rounded-full"
                src="https://i.ibb.co/QcK63FR/1.jpg"
                alt=""
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderDashboard;
