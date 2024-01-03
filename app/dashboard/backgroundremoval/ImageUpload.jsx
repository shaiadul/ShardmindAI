"use client";
import React, { useState } from "react";

const ImageUpload = ({ setCurrentStep, setComplete }) => {
  const [imageURL, setImageURL] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setCurrentStep((prev) => prev + 1);
    try {
      // Perform the image upload and get the URL
      const imageURL = await uploadImage(file);

      // Update the state with the image URL
      setImageURL(imageURL);
      // Notify the parent component that image upload is complete
      setCurrentStep((prev) => prev + 1);
      setComplete(true);
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error if needed
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=7a0f43e157252e0ca3031dea1d8dcccd",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.status === 200) {
      return data.data.url;
    } else {
      throw new Error(`Image upload failed: ${data.error.message}`);
    }
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
        {imageURL ? (
          <>
            <img
              src={imageURL}
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
      {imageURL && (
        <div className=" my-10 flex justify-center items-center">
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
