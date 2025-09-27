import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

const CropGrader = () => {
  const [result, setResult] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      // Convert image to tensor
      const tensor = tf.browser
        .fromPixels(img)
        .resizeBilinear([224, 224])
        .toFloat()
        .div(255)
        .expandDims();

      // Grade logic (simple for hackathon)
      const grade = await gradeCrop(tensor);
      setResult(grade);
    };
  };

  // Simple grading function
  const gradeCrop = async (tensor) => {
    // Extract mean color values
    const mean = tensor.mean([0, 1]);
    const [r, g, b] = await mean.array();

    console.log(await mean.array());
    // Rule-based grading (example: tomatoes)
    if (r > g && r > b && r > 0.6) {
      return "Grade A (ripe & red)";
    } else if (r > g && r > b && r > 0.4) {
      return "Grade B (partially ripe)";
    } else {
      return "Reject (unripe or poor quality)";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Crop Quality Grader</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h2 className="text-lg">Result: {result}</h2>
        </div>
      )}
    </div>
  );
};

export default CropGrader;
