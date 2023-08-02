import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'react-bootstrap';

const CanvasAnimation = ({ binaryFiles, imageFiles }) => {
  const canvasRef = useRef(null);
  //const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const audioRef = useRef(null);
  let currentAudioIndex = 0;
  //let flag = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    displayNextImage();
    function playNextAudio() {
      if (currentAudioIndex >= binaryFiles.length) {
        stopSlideshow();
        return;
      }

      const audioData = binaryFiles[currentAudioIndex];
      const blob = base64ToBlob(audioData);
      const audioURL = URL.createObjectURL(blob);

      const newAudioElement = new Audio(audioURL);

      newAudioElement.addEventListener('ended', handleAudioEnded);
      
      newAudioElement.addEventListener('canplaythrough', handleAudioCanPlay);
      audioRef.current = newAudioElement; // Update the audioRef.current reference
    }

    function handleAudioCanPlay() {
      // Start playing the new audio only after setting the state and updating the reference
      audioRef.current.removeEventListener('canplaythrough', handleAudioCanPlay);
      audioRef.current.play();
    }

    function handleAudioEnded() {
      currentAudioIndex++;
      audioRef.current.removeEventListener('ended', handleAudioEnded);
      playNextAudio();
     
      displayNextImage();
    }

    function displayNextImage() {
      const image = new Image();
      image.src = imageFiles[currentAudioIndex];
      image.onload = () => {
        const scaleFactor = 0.5; // Adjust this value to set the desired scale factor
        const scaledWidth = image.width * scaleFactor;
        const scaledHeight = image.height * scaleFactor;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, scaledWidth, scaledHeight);
      };
    }

    function startSlideshow() {
      //setCurrentAudioIndex(0);
      displayNextImage();
      playNextAudio();
    }

    function stopSlideshow() {
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
        audioRef.current.removeEventListener('ended', handleAudioEnded);
        audioRef.current.removeEventListener('canplaythrough', handleAudioCanPlay);
        audioRef.current = null;
        //alert("dd");
      }
      currentAudioIndex = 0;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
    }


    function base64ToBlob(base64Data) {
        const binaryData = atob(base64Data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        const blob = new Blob([uint8Array], { type: 'audio/mp3' }); // Adjust the type based on the audio file format
        return blob;
      }
      


    canvas.addEventListener('click', () => {
      if (audioRef.current && !audioRef.current.paused) {
       
        stopSlideshow();
        
      } else {
        
        startSlideshow();
        
      }
    });

    return () => {
      // Cleanup event listeners when unmounting the component
      canvas.removeEventListener('click', () => {});
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
        audioRef.current.removeEventListener('ended', handleAudioEnded);
        audioRef.current.removeEventListener('canplaythrough', handleAudioCanPlay);
      }
    };
  }, [binaryFiles, imageFiles, currentAudioIndex]);

  return (
    <canvas
      ref={canvasRef}
      width={384}
      height={384}
      style={{
        border: '2px solid #007bff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 1)',
        backgroundColor: '#f7f7f7',
        padding: '20px',
        textAlign: 'center',
        transition: 'opacity 0.3s ease', // Add a transition for a smoother effect
      }}
    />
  );
};

export default CanvasAnimation;

// };

// export default CanvasAnimation;
