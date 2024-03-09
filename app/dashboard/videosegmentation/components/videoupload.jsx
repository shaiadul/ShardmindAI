"use client";
import Loading from "@/components/loading/Loding";
import React, { useRef, useState, useEffect } from "react";

const VideoCanvas = ({ setCurrentStep, setComplete }) => {
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [rect, setRect] = useState(null);
  const [value, setValue] = useState(50);
  const [loading, setLoading] = useState(false);
  const [segMode, setSegMode] = useState(true);
  const [inpsBox, setInpsBox] = useState([]);
  const [inpsPoint, setInpsPoint] = useState([]);
  const [isPoint, setIsPoint] = useState(false);
  const [resultValue, setResultValue] = useState(null);
  const [inpsValue, setInpsValue] = useState([]); // Use state for inpsValue

  // console.log(inpsPoint);
  console.log(inpsValue);

  const handleSegMode = () => {
    setSegMode((prevState) => !prevState);
  };
  const handlePointMode = () => {
    setIsPoint((prevState) => !prevState);
  };

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
    setLoading(true);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
        setCurrentStep((prev) => prev + 1);
      };
      reader.readAsDataURL(file);
    }
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
        setLoading(false);
        setResultValue(result);
      });
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
    if (!isPoint) {
      setDrawing(true);
    }
    // set inps point
    if (isPoint) {
      setInpsPoint([clientX, clientY]);
      // setInpsValue((prevInpsValue) => [...prevInpsValue, [...inpsPoint]]);
      setInpsValue([...inpsValue, inpsPoint]); // Set inpsValue
      drawPoints({ nativeEvent });
    }
  };

  const drawRectangle = ({ nativeEvent }) => {
    // if (drawing) return;
    if (drawing) {
      nativeEvent.preventDefault();
      const { clientX, clientY } = nativeEvent;
      const canvas = canvasRef.current;
      const canvasOffSet = canvas.getBoundingClientRect();
      const width = clientX - canvasOffSet.left - rect.startX;
      const height = clientY - canvasOffSet.top - rect.startY;

      // store the rectangle values
      setInpsBox([clientX, clientY, clientX + width, clientY + height]);

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
    }
    // Draw points if not drawing
  };

  const drawPoints = ({ nativeEvent }) => {
    // Clear previous drawings
    // context.clearRect(0, 0, canvas.width, canvas.height);
    if (!drawing) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const canvasOffSet = canvas.getBoundingClientRect();
      const mouseX = nativeEvent.clientX - canvasOffSet.left;
      const mouseY = nativeEvent.clientY - canvasOffSet.top;

      context.fillStyle = "#7FFF7F"; // Set color
      context.beginPath();
      context.arc(mouseX, mouseY, 3, 0, 2 * Math.PI);
      context.fill();
    }
  };

  const stopDrawingRectangle = () => {
    setDrawing(false);
  };

  const aiApiCall = () => {
    const result = resultValue;
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const originalFileName = result?.result?.originalFilename;
    const url = `users/${id}/${originalFileName}`;
    const data = JSON.stringify({
      url,
      auth_token: token,
      mode: isPoint ? "points" : "box",
      inps: isPoint ? inpsValue : inpsBox,
      segmod: segMode ? "white" : "green",
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
    };

    fetch("https://x3gkf.apps.beam.cloud/image_segment", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
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

  // --------------------------------------------------
  const removeImage = () => {
    setImageUrl(null);
    setCurrentStep((prev) => prev - 1);

    // Clear the drawing on the canvas
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }; //modified

  //   --------------------------------------------------
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };
  return (
    <div className="my-20">
      {!loading && (
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
            Upload or drag & drop your file.
          </p>

          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/*, video/*"
            onChange={handleImageChange}
          />
        </label>
      )}

      {loading && <Loading />}

      {imageUrl && (
        <section>
          <div className="border_gradient_purple w-[800px] h-[600px] p-6 flex flex-col justify-center items-center mx-auto cursor-crosshair">
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
            {/* <div className="custom-range-slider ">
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleChange}
              />
              <span className="font-sans font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#FD5261] to-[#AA26B6]">
                {value}
              </span>
            </div> */}

            <div className="flex justify-between">
              <div className="flex justify-center items-center gap-3 max-w-[180px] mx-auto my-4 ">
                <span>Box</span>
                <label className="switch_obj flex justify-center my-5 mx-auto">
                  <input
                    type="checkbox"
                    checked={isPoint}
                    onChange={handlePointMode}
                  />
                  <span className="slider_obj"></span>
                </label>
                <span>Pointer</span>
              </div>
              <div className="flex justify-center items-center gap-3 max-w-[180px] mx-auto my-4 ">
                <span>Green</span>
                <label className="switch_obj flex justify-center my-5 mx-auto">
                  <input
                    type="checkbox"
                    checked={segMode}
                    onChange={handleSegMode}
                  />
                  <span className="slider_obj"></span>
                </label>
                <span>White</span>
              </div>
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
                onClick={aiApiCall}
              >
                Click For Next
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default VideoCanvas;
