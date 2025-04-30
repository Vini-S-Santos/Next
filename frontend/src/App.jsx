import React, { useState, useRef } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import CameraScreen from './components/CameraScreen';
import PhotoPreview from './components/PhotoPreview';
import FinalScreen from './components/FinalScreen';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [step, setStep] = useState('start');
  const [photoURL, setPhotoURL] = useState('');
  const webcamRef = useRef(null);
  const [isCounting, setIsCounting] = useState(false);
  const [finalUrl, setFinalUrl] = useState('');

  const handleStart = () => {
    setStep('loading');
    setTimeout(() => {
      setStep('camera');
    }, 1500);
  };

  const handleCountdownFinish = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhotoURL(imageSrc);
    setIsCounting(false);
    setStep('review');
  };

  return (
    <>
      {step === 'start' && <StartScreen onStart={handleStart} />}
      {step === 'loading' && <LoadingScreen />}
      {step === 'camera' && (
        <CameraScreen
          webcamRef={webcamRef}
          isCounting={isCounting}
          onStartCountdown={() => setIsCounting(true)}
          onCountdownFinish={handleCountdownFinish}
        />
      )}
      {step === 'review' && (
        <PhotoPreview
          url={photoURL}
          onRetake={() => setStep('camera')}
          onApprove={(url) => {
            setFinalUrl(url);
            setStep('final');
          }}
        />
      )}
      {step === 'final' && (
        <FinalScreen
          url={finalUrl}
          onRestart={() => {
            setPhotoURL('');
            setFinalUrl('');
            setStep('start');
          }}
      />)}
    </>
  );
}

export default App;
