import React, { useRef } from 'react';
import Frame from '../assets/FramePhoto.svg';
import html2canvas from 'html2canvas';

export default function PhotoPreview({ url, onRetake, onApprove }) {
  const frameRef = useRef(null);

  const handleApprove = async () => {
    setTimeout(async () => {
      if (frameRef.current) {
        const canvas = await html2canvas(frameRef.current, { useCORS: true });
  
        canvas.toBlob(async (blob) => {
          const formData = new FormData();
          formData.append('photo', blob, 'framed-photo.png');
  
          try {
            const response = await fetch('http://localhost:5000/upload', {
              method: 'POST',
              body: formData,
            });
  
            if (!response.ok) throw new Error('Erro no upload');
  
            const result = await response.json();
            onApprove(result.url);
          } catch (err) {
            console.error('Erro ao enviar imagem:', err);
            alert('Falha no envio da imagem.');
          }
        }, 'image/png');
      }
    }, 100);
  };
  

  return (
    <div className="h-screen w-full bg-gradient-to-br from-white to-gray-400 flex flex-col items-center justify-center relative">
      <div
        ref={frameRef}
        className="relative w-[887px] h-[1576.89px]"
      >
        <div className="absolute z-10 left-[1px] top-[214px] w-[884px] h-[1260px] overflow-hidden">
          <img
            src={url}
            alt="Foto capturada"
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
          />
        </div>

        <img
          src={Frame}
          alt="Moldura"
          crossOrigin="anonymous"
          className="absolute inset-0 w-full h-full object-contain z-0 pointer-events-none"
        />
      </div>

      <div className="mt-8 flex gap-4 w-[887px] justify-center">
        <button
          onClick={onRetake}
          className="flex-1 max-w-[411.5px] h-[131px] px-[40px] py-[32px] border-[8px] border-[#606060] text-[56px] leading-[67px] font-bold font-['Titillium Web'] text-[#606060] flex items-center justify-center"
        >
          Refazer
        </button>
        <button
          onClick={handleApprove}
          className="flex-1 max-w-[411.5px] h-[131px] px-[40px] py-[32px] bg-[#606060] text-white text-[56px] leading-[67px] font-bold font-['Titillium Web'] flex items-center justify-center"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}