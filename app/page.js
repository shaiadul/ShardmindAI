"use client";
import { UserAuth } from "@/components/authprovider/AuthContext";
import AddUserComponents from "@/components/testComponents/addUser";
import ShowUser from "@/components/testComponents/showUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user } = UserAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { localStorage } = window;
      const guard = localStorage.getItem("token");
      if (!guard && !user) {
        router.push("/authentication/signin");
      }
    }
  }, []);
  return (
    <main>
      {/* <h1 className="text-center my-10">Home / must be deleted</h1>
      <div className="">
        <AddUserComponents />
        <ShowUser />
      </div> */}
    </main>
  );
}
