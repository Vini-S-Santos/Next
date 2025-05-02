import React from 'react';
import logo from '../assets/NexLabLogo.svg';

export default function StartScreen({ onStart }) {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-gray-100 to-gray-300 overflow-hidden">

      <div className="flex flex-col items-center text-center gap-4">
        
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-[140px] h-auto mb-4" />

        {/* Título */}
        <div className="text-[5vw] leading-none font-bold font-['Titillium Web'] text-black">
          <div>Photo</div>
          <div>Opp</div>
        </div>

        {/* Botão */}
        <button
          onClick={onStart}
          className="mt-4 w-[200px] py-3 text-white text-base bg-gray-700"
        >
          Iniciar
        </button>
      </div>
    </div>
  );
}
