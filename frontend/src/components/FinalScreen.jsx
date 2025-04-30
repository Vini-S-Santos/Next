import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function FinalScreen({ url, onRestart }) {
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    if (url) {
      setShowQRCode(true);

      const timer = setTimeout(() => {
        onRestart();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [url, onRestart]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-white to-gray-300 text-center px-4">
      <h2 className="text-3xl font-bold mb-4 text-black">Escaneie o QR Code</h2>

      {showQRCode && (
        <div className="mb-6">
          <QRCodeSVG value={url} size={256} />
        </div>
      )}

      <p className="mb-4 text-gray-800 text-lg break-words max-w-sm">
        Ou acesse diretamente:
      </p>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline break-all max-w-sm"
      >
        {url}
      </a>
    </div>
  );
}
