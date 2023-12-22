import React from "react";
import HeaderDashboard from "./components/header";
import AsideDashboard from "./components/aside";
import BottomNav from "./components/bottomnav";

const layout = ({ children }) => {
  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-[#0C051F] text-white">
        {/* <HeaderDashboard /> */}
        <AsideDashboard />
        <div className="h-auto my-20 md:ml-64">{children}</div>
        <BottomNav />
      </div>
    </div>
  );
};

export default layout;
