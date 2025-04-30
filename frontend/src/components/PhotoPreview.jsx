import React from 'react';

export default function PhotoPreview({ url, onRetake, onApprove }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <img src={url} alt="Preview" className="w-full max-w-sm rounded mb-4" />
      <div className="flex gap-4">
        <button onClick={onRetake} className="px-4 py-2 bg-yellow-500 rounded">Refazer</button>
        <button onClick={onApprove} className="px-4 py-2 bg-green-500 rounded">Aprovar</button>
      </div>
    </div>
  );
}
