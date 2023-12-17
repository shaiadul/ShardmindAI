"use client";

export default function Home() {
  if (localStorage.getItem("token") === null)
    window.location.replace("/authentication/signin");

  window.location.replace("/authentication/signin");

  return <main></main>;
}
