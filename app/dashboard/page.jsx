"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const router = useRouter();

  if (typeof window !== "undefined") {
   const guard = localStorage.getItem("token") 
    if (!guard) {
      router.push("/authentication/signin");
    }
  }
  return <div></div>;
};

export default Dashboard;
