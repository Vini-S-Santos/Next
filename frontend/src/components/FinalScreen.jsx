import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function FinalScreen({ url, onRestart }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRestart();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onRestart]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h2 className="text-2xl mb-4">Escaneie o QR Code</h2>
      <QRCodeSVG value={url} size={256} />
    </div>
  );
}
