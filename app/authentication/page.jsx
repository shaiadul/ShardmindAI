"use client";
import { useRouter } from "next/navigation";

const Authentication = () => {
    const router = useRouter();

  if (typeof window !== "undefined") {
   const guard = localStorage.getItem("token") 
    if (!guard) {
      router.push("/authentication/signin");
    }
  }
    return <div>THIS IS AUTHENTICATION PAGE</div>
}

export default Authentication;
