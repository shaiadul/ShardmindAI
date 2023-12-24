"use client";
import { useRouter } from "next/navigation";
import Steps from "./Steps";

const Page = () => {
  const router = useRouter();

  if (typeof window !== "undefined") {
   const guard = localStorage.getItem("token") 
    if (!guard) {
      router.push("/authentication/signin");
    }
  }
  return (
    <section className="md:mx-5 my-10">
      <div className="flex justify-center">
        <span className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#FD5261] to-[#AA26B6]">
          Remove Background
        </span>
      </div>

      <div className="flex justify-center">
        <p className="my-10 border-b-2 inline-block cursor-pointer">
          How to Use
        </p>
      </div>

      <Steps />
    </section>
  );
};

export default Page;
