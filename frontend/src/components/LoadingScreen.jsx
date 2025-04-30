import React from 'react';
import loader from "../assets/loader.svg"

export default function LoadingScreen() {
    return (
      <div className="w-[1080px] h-[1920px] bg-gradient-to-br from-white to-gray-300 flex items-center justify-center">
        <img
          src={loader}
          alt="Carregando"
          className="w-16 h-16 animate-spin"
        />
      </div>
    );
  }
  