import './App.css';
import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import CameraScreen from './components/CameraScreen';
import Countdown from './components/Countdown';
import PhotoPreview from './components/PhotoPreview';
import FinalScreen from './components/FinalScreen';
import LoadingScreen from './components/LoadingScreen'; // <-- adicionado

function App() {
  const [step, setStep] = useState('start');
  const [imageSrc, setImageSrc] = useState(null);
  const [photoURL, setPhotoURL] = useState('');

  const handleCapture = async (imageBase64) => {
    setStep('uploading');
    const blob = await (await fetch(imageBase64)).blob();
    const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('photo', file);

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setPhotoURL(data.url);
    setStep('review');
  };

  const handleStart = () => {
    setStep('loading');
    setTimeout(() => {
      setStep('camera');
    }, 1500); // simula carregamento
  };

  return (
    <>
      {step === 'start' && <StartScreen onStart={handleStart} />}
      {step === 'loading' && <LoadingScreen />}
      {step === 'camera' && <CameraScreen onCapture={() => setStep('countdown')} />}
      {step === 'countdown' && <Countdown onFinish={() => setStep('capture')} />}
      {step === 'capture' && <CameraScreen onCapture={handleCapture} />}
      {step === 'review' && <PhotoPreview url={photoURL} onRetake={() => setStep('camera')} onApprove={() => setStep('final')} />}
      {step === 'final' && <FinalScreen url={photoURL} onRestart={() => { setPhotoURL(''); setStep('start'); }} />}
    </>
  );
}

export default App;
