"use client";
import React, { useRef, useState, useEffect } from "react";

const DrawingCanvas = ({ setCurrentStep, setComplete }) => {
  const canvasRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);
  const [drawing, setDrawing] = useState(false);

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

  const handleCanvasDraw = (context, e) => {
    context.strokeStyle = "#7FFF7F";
    context.lineWidth = 15; // Set the line width (adjust as needed)
    context.lineCap = "round"; // Set the line cap style to round

    if (!drawing) {
      // Move to the starting point if not already drawing
      context.beginPath();
      context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    } else {
      // Draw a line to the current point
      context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      context.stroke();
    }

    // Update the drawing state
    setDrawing(true);
  };

  // Add this useEffect hook to load the background image when the component mounts
  useEffect(() => {
    if (imageUrl) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [imageUrl]);

  const handleCanvasDrawStart = (e) => {
    setDrawing(true);
  }; //modified

  const handleCanvasDrawMove = (e) => {
    // Continue drawing
    if (drawing) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      handleCanvasDraw(context, e);
    }
    // }
  }; //modified

  const handleCanvasDrawEnd = () => {
    setDrawing(false);
  }; //modified

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
        <div>
          <div className="border_gradient_purple p-6 w-fit h-fit flex flex-col justify-center items-center mx-auto cursor-crosshair">
            <canvas
              ref={canvasRef}
              className="responsive-canvas"
              width={800}
              height={600}
              onMouseDown={(e) => handleCanvasDrawStart(e)}
              onMouseMove={(e) => handleCanvasDrawMove(e)}
              onMouseUp={handleCanvasDrawEnd}
              onMouseLeave={handleCanvasDrawEnd}
            />
          </div>
          <div className=" my-10 flex justify-center items-center">
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
      )}
    </div>
  );
};

export default DrawingCanvas;
