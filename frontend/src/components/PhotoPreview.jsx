import React from 'react';
import Frame from '../assets/FramePhoto.svg';

export default function PhotoPreview({ url, onRetake, onApprove }) {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-white to-gray-400 flex flex-col items-center justify-center relative">
      <div className="relative w-[887px] h-[1576.89px]">
        <div className="absolute z-10 left-[2px] top-[218px] w-[882px] h-[1258px] overflow-hidden">
          <img
            src={url}
            alt="Foto capturada"
            className="w-full h-full object-cover"
          />
        </div>

        <img
          src={Frame}
          alt="Moldura"
          className="absolute inset-0 w-full h-full object-contain z-0 pointer-events-none"
        />
      </div>

      <div className="mt-8 flex gap-4 w-[887px] justify-center">
        <button
          onClick={onRetake}
          className="flex-1 max-w-[411.5px] h-[131px] px-[40px] py-[32px] border-[8px] border-[#606060] text-[56px] leading-[67px] font-bold font-['Titillium Web'] text-[#606060] text-center flex items-center justify-center"
        >
          Refazer
        </button>
        <button
          onClick={onApprove}
          className="flex-1 max-w-[411.5px] h-[131px] px-[40px] py-[32px] bg-[#606060] text-white text-[56px] leading-[67px] font-bold font-['Titillium Web'] text-center flex items-center justify-center"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
