"use client";
import React, { useState } from "react";

const ImageUpload = () => {
  const [imageURL, setImageURL] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // Perform the image upload and get the URL
      const imageURL = await uploadImage(file);

      // Update the state with the image URL
      setImageURL(imageURL);
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error if needed
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("https://api.imgbb.com/1/upload?key=7a0f43e157252e0ca3031dea1d8dcccd", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.status === 200) {
      return data.data.url;
    } else {
      throw new Error(`Image upload failed: ${data.error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center font-sans my-20">
      <label
        htmlFor="dropzone-file"
        className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-4 border-dashed border-gradient-to-br from-[#FD5261] to-[#AA26B6] p-6 text-center"
      >
        

        {imageURL ? (
          <img
            src={imageURL}
            alt="Uploaded"
            className="mt-2 rounded-md border-2 border-gray-400"
            style={{ maxWidth: "100%" }}
          />
        ) : (
          <><svg
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
          Payment File
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
    </div>
  );
};

export default ImageUpload;
