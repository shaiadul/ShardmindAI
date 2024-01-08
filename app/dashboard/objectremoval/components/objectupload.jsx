"use client";
import React, { useRef, useState, useEffect } from "react";

const ObjectCanvas = ({ setCurrentStep, setComplete }) => {
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [rect, setRect] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext("2d");

      if (imageUrl) {
        const image = new Image();
        image.src = imageUrl;

        image.onload = () => {
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  }, [imageUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
        setCurrentStep((prev) => prev + 1);
      };
      reader.readAsDataURL(file);
    }
  };

  const startDrawingRectangle = ({ nativeEvent }) => {
    nativeEvent.preventDefault();
    const { clientX, clientY } = nativeEvent;
    const canvas = canvasRef.current;
    const canvasOffSet = canvas.getBoundingClientRect();
    setRect({
      startX: clientX - canvasOffSet.left,
      startY: clientY - canvasOffSet.top,
    });
    setDrawing(true);
  };

  const drawRectangle = ({ nativeEvent }) => {
    if (!drawing) return;
    nativeEvent.preventDefault();
    const { clientX, clientY } = nativeEvent;
    const canvas = canvasRef.current;
    const canvasOffSet = canvas.getBoundingClientRect();
    const width = clientX - canvasOffSet.left - rect.startX;
    const height = clientY - canvasOffSet.top - rect.startY;

    const context = canvas.getContext("2d");
    context.strokeStyle = "#7FFF7F";
    context.lineWidth = 3;
    context.lineCap = "round";

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (imageUrl) {
      const image = new Image();
      image.src = imageUrl;

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      context.strokeRect(rect.startX, rect.startY, width, height);
    }
  };

  const stopDrawingRectangle = () => {
    setDrawing(false);
  };

  const handleSaveImage = async () => {
    const canvas = canvasRef.current;
    const base64Image = canvas.toDataURL("image/png");

    try {
      console.log("Uploading image to ImgBB...");
      const response = await uploadImageToImgBB(base64Image);
      console.log("Image hosted on ImgBB:", response.data.url);
      // Now you can use the hosted image URL as needed
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
      // Handle error if needed
    }
  };

  const uploadImageToImgBB = async (base64Image) => {
    const blob = await fetch(base64Image).then((res) => res.blob());

    const formData = new FormData();
    formData.append("image", blob);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=7a0f43e157252e0ca3031dea1d8dcccd",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("ImgBB API Error:", errorData);
        throw new Error(`Image upload failed: ${errorData.error.message}`);
      }

      return response.json();
    } catch (error) {
      console.error("ImgBB API Error (Catch Block):", error);
      throw error;
    }
  };

  // ---------------------------------
  const removeImage = () => {
    setImageUrl(null);
    setCurrentStep((prev) => prev - 1);

    // Clear the drawing on the canvas
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }; //modified
  return (
    <div className="my-20">
      <label
        htmlFor="dropzone-file"
        className={`mx-auto cursor-pointer ${
          imageUrl ? "hidden" : "flex"
        } w-full max-w-lg flex-col items-center rounded-xl border_gradient_purple p-6 text-center`}
      >
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
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>

      {imageUrl && (
        <section>
          <div className="border_gradient_purple p-6 w-fit h-fit flex flex-col justify-center items-center mx-auto cursor-crosshair">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              onMouseDown={startDrawingRectangle}
              onMouseMove={drawRectangle}
              onMouseUp={stopDrawingRectangle}
            />
          </div>
          <div className=" my-10 flex-col justify-center items-center">
            <div className="flex justify-center items-center max-w-[180px] mx-auto">
              <span>Manual</span>
              <label class="switch_obj flex justify-center my-5 mx-auto">
                <input type="checkbox" />
                <span class="slider_obj"></span>
              </label>
              <span>Auto</span>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={removeImage}
                className="btn mt-2 bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-gradient-to-l rounded-lg px-2 py-1 mr-2"
              >
                Remove
              </button>
              {/* <button>
              <a href={imageUrl} download="image.png">
                Download Image
              </a>
            </button> */}
              <button
                className="btn mt-2 bg-gradient-to-r from-pink-500 to-violet-500 hover:bg-gradient-to-l rounded-lg px-2 py-1"
                onClick={handleSaveImage}
              >
                Save Image
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ObjectCanvas;
