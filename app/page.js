"use client";

export default function Home() {
  if (window.location.pathname === "/") {
    window.location.href = "/dashboard/personalfeed";
  }

  return <main></main>;
}
