import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import logo from '../assets/NexLabLogo.svg';

export default function FinalScreen({ url, photoUrl, onRestart }) {
  const [showQRCode, setShowQRCode] = useState(false);
  const [showThanksModal, setShowThanksModal] = useState(false);

  useEffect(() => {
    if (url) {
      setShowQRCode(true);
    }
  }, [url]);

  const handleFinalize = () => {
    setShowThanksModal(true);

    setTimeout(() => {
      onRestart();
    }, 3000);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-white to-gray-300 flex flex-col items-center justify-center px-4 font-['Titillium_Web']">
      <div className="relative w-[434px] h-[768px] bg-white rounded-sm border border-gray-300 p-2 flex flex-col justify-between overflow-hidden">
        
        <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
          <img src={logo} alt="Logo" className="w-[80px] h-auto" />
          <span className="text-sm font-semibold text-[#646464]">we make tech simple_</span>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-2 relative">
          <img
            src={photoUrl}
            alt="Foto capturada"
            className="w-full h-full object-cover rounded"
          />

          {showThanksModal && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-[300px] text-center z-50 border border-gray-200">
              <h2 className="text-2xl font-bold text-[#646464] mb-2">Obrigado!</h2>
              <p className="text-[#646464] text-sm">Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          )}
        </div>

        {showQRCode && !showThanksModal && (
          <div className="absolute bottom-[90px] right-[20px] w-[170px] h-[200px] bg-white border rounded shadow-md p-2 text-xs flex flex-col items-center">
            <span className="mb-1 font-bold text-[13px] text-[#646464]">Fazer download</span>
            <QRCodeSVG value={url} size={110} />
            <span className="text-[10px] mt-1 text-[#646464] text-center">(QR CODE)</span>
          </div>
        )}

        <div className="text-center py-2 text-sm text-[#646464] bg-gray-100">
          we make tech simple_
        </div>
      </div>

      {!showThanksModal && (
        <button
          onClick={handleFinalize}
          className="mt-6 w-[434px] h-[64px] bg-gray-700 text-white text-xl font-bold font-['Titillium_Web']"
        >
          Finalizar
        </button>
      )}
    </div>
  );
}
