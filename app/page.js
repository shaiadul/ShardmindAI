"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const routeFunction = () => {
    if (router.pathname === "/") {
      router.push("/authentication/signin");
    }
  };
  useEffect(() => {
    routeFunction();
  }, [router.pathname]);

  return <main></main>;
}
