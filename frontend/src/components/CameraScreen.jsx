import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import EllipseButtonIcon from '../assets/EllipseButtonIcon.svg';

export default function CameraScreen({ onCapture }) {
  const webcamRef = useRef(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen bg-gradient-to-br from-white to-gray-300">

      <div className="flex flex-grow items-center justify-center">
        <div className="w-[700px] h-[900px] bg-black rounded overflow-hidden shadow">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
            videoConstraints={{ facingMode: 'user' }}
          />
        </div>
      </div>


     <button
        onClick={handleCapture}
        className="absolute bottom-[40px] w-[222px] h-[222px] flex items-center justify-center"
        style={{ left: 'calc(50% - 111px)' }}
        aria-label="Capturar"
      >
        <img src={EllipseButtonIcon} alt="Botão Capturar" className="w-full h-full" />
      </button>
    </div>
  );
}

