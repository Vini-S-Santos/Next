import React, { useRef } from 'react';
import Webcam from 'react-webcam';

export default function CameraScreen({ onCapture }) {
  const webcamRef = useRef(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full max-w-sm rounded"
      />
      <button onClick={handleCapture} className="mt-6 px-4 py-2 bg-green-500 text-white rounded">
        Capturar
      </button>
    </div>
  );
}
