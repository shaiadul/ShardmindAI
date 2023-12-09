"use client";
import React, { useRef, useState } from "react";

const DrawingCanvasTest = () => {
  const canvasRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);
  const [drawing, setDrawing] = useState(false);

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
    // Customize drawing functionality here
    // Example: Draw a solid line with a green color
    context.strokeStyle = "teal";
    context.lineWidth = 4; // Set the line width (adjust as needed)
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

  const handleCanvasDrawStart = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Draw the background image
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Start drawing on top of the background image
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

  return (
    <div className="">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imageUrl && (
        <div className="border-2 border-pink-500 relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              border: "1px solid #000",
            }}
            onMouseDown={(e) => handleCanvasDrawStart(e)}
            onMouseMove={(e) => handleCanvasDrawMove(e)}
            onMouseUp={handleCanvasDrawEnd}
            onMouseLeave={handleCanvasDrawEnd}
          />
        </div>
      )}
      <div>
        <button className="bg-red-400 p-2 rounded-lg" onClick={handleSaveImage}>
          Save
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvasTest;
