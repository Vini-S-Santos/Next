import React, { useState, useEffect } from 'react';

export default function Countdown({ onFinish }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      onFinish();
      return;
    }

    const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, onFinish]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-white to-gray-300">
      <p className="text-9xl font-bold">{count}</p>
    </div>
  );
}
