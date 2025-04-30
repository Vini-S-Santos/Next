import React, { useEffect, useState } from 'react';

export default function Countdown({ onFinish }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="flex items-center justify-center h-screen text-8xl bg-black text-white">
      {count}
    </div>
  );
}
