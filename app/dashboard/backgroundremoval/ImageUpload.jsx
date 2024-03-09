"use client";
import React, { useState, useEffect } from "react";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Loading from "@/components/loading/Loding";

const ImageUpload = ({ setCurrentStep, setComplete }) => {
  const [imageURL, setImageURL] = useState(null);
  const [isGreen, setIsGreen] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [currentFileUrl, setCurrentFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChangeGreenBg = () => {
    setIsGreen((prevState) => !prevState);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setLoading(true);
    if (!file) return;
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

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

        const originalFileName = result?.result?.originalFilename;
        const url = `users/${id}/${originalFileName}`;
        const data = JSON.stringify({
          auth_token: token,
          url,
          mode: isGreen ? 1 : 2,
        });

        console.log(data);

        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Basic ZTQxMDA1NDhmNzQ5MTkyMjc3OWE3NDg4MzQ5OTJhNzA6ZDE0NjYyNmRkZTQzOGI1MGJmNTMyNzFjYmNiZDFkMGI="
        );
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: data,
          redirect: "follow",
        };

        fetch("https://x3gkf.apps.beam.cloud/bgremove/", requestOptions)
          .then((response) => response.text())
          .then(
            (result) => readFile(result.slice(1, -1).toString()),
          )
          .catch((error) => console.error(error));
      });
  };

  const readFile = async (fileKey) => {
    setLoading(true);
    const client = new S3Client({
      region: "nyc3",
      credentials: {
        accessKeyId: "DO00E62JWRAHTAANAADR",
        secretAccessKey: "Z5ICzGAlMg/7B3WTAUzAbPy9SX910ZrrVovadJjc98s",
      },
      endpoint: "https://nyc3.digitaloceanspaces.com",
    });

    const command = new GetObjectCommand({
      Bucket: "shardmind.ai",
      Key: fileKey,
    });

    try {
      const url = await getSignedUrl(client, command, { expiresIn: 3600 });
      console.log(url);
      setCurrentFileUrl(url);
      setLoading(false);
      return url; // The URL is valid for 1 hour
    } catch (error) {
      console.error("error from download", error);
    }
  };

  const downloadFile = async () => {
    // Fetch the file content
    const response = await fetch(currentFileUrl);
    const blob = await response.blob();

    // Create a link element and set its attributes
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "remove_bg.png";

    // Append the link to the body, trigger a click event, and remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="font-sans my-20">
      {loading && <Loading />}
      {!loading && (
        <label
          htmlFor="dropzone-file"
          className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border_gradient_purple p-6 text-center"
        >
          {currentFileUrl ? (
            <>
              <img
                src={currentFileUrl}
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
      )}
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
      {currentFileUrl && (
        <div className="flex justify-center items-center">
          <button className="btn mt-2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg px-2 py-1">
            <a href={currentFileUrl} download={currentFileUrl}>
              Download
            </a>
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
