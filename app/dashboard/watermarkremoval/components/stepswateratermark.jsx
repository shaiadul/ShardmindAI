"use client";
import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import DrawingCanvas from "./drawingupload";

const StepsWaterMark = () => {
  const steps = ["Upload", "Processing", "Finish"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  return (
    <>
      <div className="flex justify-center">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
      {/* {!complete && (
      <button
        className="btn"
        onClick={() => {
          currentStep === steps.length
            ? setComplete(true)
            : setCurrentStep((prev) => prev + 1);
        }}
      >
        {currentStep === steps.length ? "Finish" : "Next"}
      </button>
    )} */}

      <DrawingCanvas setCurrentStep={setCurrentStep} setComplete={setComplete} />
    </>
  );
};

export default StepsWaterMark;
