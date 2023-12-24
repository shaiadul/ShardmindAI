"use client";
import AddUserComponents from "@/components/testComponents/addUser";
import ShowUser from "@/components/testComponents/showUser";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  if (typeof window !== "undefined") {
   const guard = localStorage.getItem("token") 
    if (!guard) {
      router.push("/authentication/signin");
    }
  }
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
