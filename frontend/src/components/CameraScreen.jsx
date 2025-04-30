import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import EllipseButtonIcon from '../assets/EllipseButtonIcon.svg';

export default function CameraScreen({ webcamRef, isCounting, onStartCountdown, onCountdownFinish }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (isCounting) {
      setCount(3);
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setTimeout(() => onCountdownFinish(), 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isCounting, onCountdownFinish]);

  return (
    <div className="flex flex-col justify-between items-center h-screen bg-gradient-to-br from-white to-gray-300 relative">

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


      {!isCounting && (
        <button
          onClick={onStartCountdown}
          className="absolute bottom-[40px] w-[222px] h-[222px] flex items-center justify-center"
          style={{ left: 'calc(50% - 111px)' }}
        >
          <img src={EllipseButtonIcon} alt="Botão Capturar" className="w-full h-full" />
        </button>
      )}


      {isCounting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-20">
          <p className="text-white text-[180px] font-bold">{count}</p>
        </div>
      )}
    </div>
  );
}
