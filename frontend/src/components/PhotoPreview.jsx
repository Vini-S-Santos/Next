import React, { useRef } from 'react';
import domtoimage from 'dom-to-image-more';
import Frame from '../assets/FramePhoto.svg';

export default function PhotoPreview({ url, onRetake, onApprove }) {
  const frameRef = useRef(null);

  const handleApprove = async () => {
    if (frameRef.current) {
      try {
        const blob = await domtoimage.toBlob(frameRef.current, {
          quality: 1,
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left',
          },
        });

        const formData = new FormData();
        formData.append('photo', blob, 'framed-photo.png');

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Erro no upload');

        const result = await response.json();
        onApprove(result.url);
      } catch (err) {
        console.error('Erro ao exportar imagem:', err);
        alert('Falha ao gerar imagem.');
      }
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-white to-gray-400 flex flex-col items-center justify-center relative">
      <div
        ref={frameRef}
        className="relative w-[434px] h-[768px] border border-white rounded-sm"
      >
        <div className="absolute left-[2px] top-[106px] w-[428.5px] h-[622px] z-10">
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

      <div className="mt-8 flex gap-4 w-[887px] justify-center mb-5">
        <button
          onClick={onRetake}
          className="flex-1 max-w-[300.5px] h-[80px] px-[40px] py-[32px] border-[8px] border-[#606060] text-[30px] leading-[67px] font-bold font-['Titillium Web'] text-[#606060] flex items-center justify-center"
        >
          Refazer
        </button>
        <button
          onClick={handleApprove}
          className="flex-1 max-w-[300px] h-[80px] px-[40px] py-[32px] bg-[#606060] text-white text-[30px] leading-[67px] font-bold font-['Titillium Web'] flex items-center justify-center"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
