"use client";
import React, { useState } from "react";
import axios from "axios";

const ImageUpload = ({ setCurrentStep, setComplete }) => {
  const [imageURL, setImageURL] = useState(null);
  const [isGreen, setIsGreen] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleChangeGreenBg = () => {
    setIsGreen((prevState) => !prevState);
  };
  console.log(isGreen);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append(
      "Cookie",
      "currentUserRole=SH; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWRhZmQ2M2Y1ODQ4NjJhZjk1NzllMTYiLCJyb2xlIjoiU0giLCJpYXQiOjE3MDg4NTU2OTgsImV4cCI6MTcxMTQ0NzY5OH0.Spna6acIy8tKasXgLe71VAKPq0VofjXZ9ORTFFyAChA"
    );

    const formdata = new FormData();
    formdata.append("userId", id);
    formdata.append("file", file, file["name"]);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://api.shardmind.io/api/v1/storage/upload?file", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCurrentStep(2);
        setIsFileUploaded(true);
        const etagText = result?.result?.ETag;
        const etag = etagText?.replace(/"/g, "");
        const originalFileName = result?.result?.originalFilename;
        const url = `users/${etag}/${originalFileName}`;
        const data = {
          auth_token: token,
          url,
          mode: isGreen ? "1" : "2",
        };
        // console.log(data);
        axios
          .post("https://x3gkf.apps.beam.cloud/bgremove", data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.error("error from remove bg:", error));
      })
      .catch((error) => console.error(error));
  };

  const handleDownload = () => {
    // Implement the download logic here, for example using the browser's download feature
    if (imageURL) {
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "downloaded_image";
      link.click();
    }
  };
  return (
    <div className="font-sans my-20">
      <label
        htmlFor="dropzone-file"
        className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border_gradient_purple p-6 text-center"
      >
        {isFileUploaded ? (
          <>
            <img
              src="https://static6.depositphotos.com/1021974/640/i/950/depositphotos_6403977-stock-photo-checkbox.jpg"
              alt="Uploaded"
              className="mt-2 rounded-md "
              style={{ maxWidth: "100%" }}
            />
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-[#AA26B6]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <h2 className="mt-4 text-xl font-medium text-gray-400 tracking-wide">
              Upload File
            </h2>
            <p className="mt-2 text-gray-500 tracking-wide">
              Upload or drag & drop your file SVG, PNG, JPG, or GIF.
            </p>

            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
          </>
        )}
      </label>
      <div className="flex justify-center items-center max-w-[180px] mx-auto my-4">
        <span>White</span>
        <label className="switch_obj flex justify-center my-5 mx-auto">
          <input
            type="checkbox"
            checked={isGreen}
            onChange={handleChangeGreenBg}
          />
          <span className="slider_obj"></span>
        </label>
        <span>Green</span>
      </div>
      {isFileUploaded && (
        <div className="flex justify-center items-center">
          <button
            className="btn mt-2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg px-2 py-1"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
