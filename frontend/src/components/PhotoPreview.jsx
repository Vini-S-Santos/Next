import React, { useEffect } from 'react';
import Frame from '../assets/FramePhoto.svg';

export default function PhotoPreview({ url, onRetake, onApprove }) {
  useEffect(() => {
    console.log("aqui");
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-white to-gray-400 flex flex-col items-center justify-between relative">
      <div className="relative w-full h-full flex items-center justify-center">
        <img src={url} alt="Foto capturada" className="absolute w-full h-full object-cover" />

        <img
          src={Frame}
          alt="Moldura"
          className="absolute w-full h-full object-cover pointer-events-none"
        />
      </div>

      <div className="absolute bottom-8 w-full px-6 flex justify-between gap-6">
        <button
          onClick={onRetake}
          className="w-1/2 border border-gray-500 py-4 text-lg font-semibold text-gray-700 bg-white"
        >
          Refazer
        </button>
        <button
          onClick={onApprove}
          className="w-1/2 bg-gray-700 py-4 text-lg font-semibold text-white"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
