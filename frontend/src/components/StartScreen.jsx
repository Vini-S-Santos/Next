import React from 'react';
import logo from '../assets/NexLabLogo.svg';

export default function StartScreen({ onStart }) {
  return (
    <div className="relative w-[1080px] h-[1920px] bg-gradient-to-br from-gray-100 to-gray-300 mx-auto overflow-hidden">
      <img
        src={logo}
        alt="Logo"
        className="absolute top-[152px] left-[413px] w-[255px] h-[166px]"
      />

      <div className="absolute top-[712px] left-[221px] w-[638px] h-[496px] flex flex-col justify-center items-center text-[248px] leading-[248px] font-bold font-['Titillium Web'] text-black">
        <span>Photo</span>
        <span>Opp</span>
      </div>

      <button
        onClick={onStart}
        className="absolute top-[1658px] left-[62px] w-[956px] py-[32px] px-[40px] text-white text-2xl bg-gray-700 hover:bg-gray-800 transition"
      >
        Iniciar
      </button>
    </div>
  );
}
