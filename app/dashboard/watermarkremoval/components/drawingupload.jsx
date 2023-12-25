"use client";
import React, { useRef, useState } from "react";

const DrawingCanvas = () => {
  const canvasRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [currentBox, setCurrentBox] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasDraw = (context, e) => {
    context.strokeStyle = "#7FFF7F";
    context.lineWidth = 2;
    context.lineCap = "round";

    if (!drawing) {
      context.beginPath();
      context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    } else {
      context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      context.stroke();
    }

    setDrawing(true);
  };

  const handleCanvasDrawStart = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      setDrawing(true);
      handleCanvasDraw(context, e);
    };
  };

  const handleCanvasDrawMove = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    handleCanvasDraw(context, e);
  };

  const handleCanvasDrawEnd = () => {
    setDrawing(false);
  };

  const handleEnableBox = () => {
    setDrawing(false);
    setCurrentBox(null); // Reset current box when enabling box mode
  };

  const handleBoxStart = (e) => {
    setCurrentBox({ startX: e.nativeEvent.offsetX, startY: e.nativeEvent.offsetY });
  };

  const handleBoxDraw = (e) => {
    if (currentBox) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const { startX, startY } = currentBox;
      const endX = e.nativeEvent.offsetX;
      const endY = e.nativeEvent.offsetY;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(new Image(), 0, 0, canvas.width, canvas.height);

      // Draw existing boxes
      boxes.forEach((box) => {
        drawBoundingBox(context, box.startX, box.startY, box.endX, box.endY);
      });

      // Draw the current box
      drawBoundingBox(context, startX, startY, endX, endY);
    }
  };

  const handleBoxEnd = () => {
    if (currentBox) {
      setBoxes([...boxes, currentBox]);
      setCurrentBox(null);
      setDrawing(true);
    }
  };

  const drawBoundingBox = (context, startX, startY, endX, endY) => {
    context.strokeStyle = "#FF0000";
    context.lineWidth = 2;
    context.strokeRect(startX, startY, endX - startX, endY - startY);
  };

  return (
    <div className="my-20">
      <label
        htmlFor="dropzone-file"
        className={`mx-auto cursor-pointer ${
          imageUrl ? "hidden" : "flex"
        } w-full max-w-lg flex-col items-center rounded-xl border-4 border-dashed border-gradient-to-br from-[#FD5261] to-[#AA26B6] p-6 text-center`}
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
          Payment File
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
        <div className="border-4 border-dashed border-gradient-to-br from-[#FD5261] to-[#AA26B6] p-6 w-fit h-fit flex flex-col justify-center items-center mx-auto cursor-crosshair">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onMouseDown={(e) => (drawing ? handleCanvasDrawStart(e) : handleBoxStart(e))}
            onMouseMove={(e) => (drawing ? handleCanvasDrawMove(e) : handleBoxDraw(e))}
            onMouseUp={drawing ? handleCanvasDrawEnd : handleBoxEnd}
            onMouseLeave={drawing ? handleCanvasDrawEnd : handleBoxEnd}
          />

          <div className=" my-10 flex justify-center items-center">
            <button
              className="btn mt-2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg px-2 py-1"
              onClick={handleSaveImage}
            >
              Save Image
            </button>
            <button
              className="btn mt-2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg px-2 py-1 ml-3"
              onClick={handleEnableBox}
            >
              Enable Box
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawingCanvas;








// const uploadImageToImgBB = async (base64Image) => {
//   const blob = await fetch(base64Image).then((res) => res.blob());

//   const formData = new FormData();
//   formData.append("image", blob);

//   try {
//     const response = await fetch(
//       "https://api.imgbb.com/1/upload?key=7a0f43e157252e0ca3031dea1d8dcccd",
//       {
//         method: "POST",
//         body: formData,
//         headers: {
//           Accept: "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("ImgBB API Error:", errorData);
//       throw new Error(`Image upload failed: ${errorData.error.message}`);
//     }

//     return response.json();
//   } catch (error) {
//     console.error("ImgBB API Error (Catch Block):", error);
//     throw error;
//   }
// };