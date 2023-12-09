import { faBucket, faHome, faImage, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const BottomNav = () => {
  return (
    <nav class="mobile-nav">
      <Link href="/dashboard/personalfeed" class="bloc-icon">
        <FontAwesomeIcon icon={faHome} className="text-[#C61FA2] w-8 h-8 hover_icon" />
      </Link>
      <Link href="/dashboard/backgroundremoval" class="bloc-icon">
        <FontAwesomeIcon icon={faVideoCamera} className="text-[#C61FA2] w-8 h-8 hover_icon" />
      </Link>
      <Link href="/dashboard/watermarkremoval" class="bloc-icon">
        <FontAwesomeIcon icon={faBucket} className="text-[#C61FA2] w-8 h-8 hover_icon" />
      </Link>
      <Link href="/dashboard/personalfeed" class="bloc-icon">
        <FontAwesomeIcon icon={faImage} className="text-[#C61FA2] w-8 h-8 hover_icon" />
      </Link>
      
    </nav>
  );
};

export default BottomNav;
