"use client";
import { AddUser } from "@/app/redux/slices/userSlices";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddUserComponents = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 
  const dispatch = useDispatch();
  const HandleSubmit = () => {
    const data = {
      name,
      email,
    };
    dispatch(AddUser(data));
  };

  return (
    <div className="border mb-10">
      <h1 className="text-center text-orange-300 mb-5">AddUserComponents</h1>

      <div className="flex flex-col justify-center items-center gap-5 text-slate-500">
        <div>
          <label className="mr-2" htmlFor="name">
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            name="name"
          />
        </div>
        <div>
          <label className="mr-2" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="email"
            name="email"
          />
        </div>
        <button
          onClick={HandleSubmit}
          className="bg-green-400 px-3 py-1 my-5 rounded-md"
        >
          Add user
        </button>
      </div>
    </div>
  );
};

export default AddUserComponents;
