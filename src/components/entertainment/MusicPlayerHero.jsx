"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaPalette,
  FaMagic,
} from "react-icons/fa";
import Image from "next/image";

export default function MusicPlayerHero({
  currentSong,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
}) {
  console.log("currentSong in MusicPlayerHero", currentSong);
  // Extract properties with fallbacks for nested structure
  const audioSrc = currentSong?.mediaId?.file?.url || currentSong?.audio;
  const coverImage =
    currentSong?.mediaId?.thumbnail?.url ||
    currentSong?.cover ||
    "/placeholder.jpg";
  const title =
    currentSong?.customTitle ||
    currentSong?.mediaId?.title ||
    currentSong?.title ||
    "Unknown Title";
  const description =
    currentSong?.description ||
    currentSong?.mediaId?.description ||
    "No description available.";

  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bgGradient, setBgGradient] = useState(
    "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)"
  );
  const [showVisualizer, setShowVisualizer] = useState(false);

  // 🔹 Generate Random Gradient
  const generateGradient = () => {
    const hue = Math.floor(Math.random() * 360);
    const randomColor = `hsl(${hue}, 60%, 20%)`;
    setBgGradient(`linear-gradient(135deg, ${randomColor} 0%, #000000 100%)`);
  };

  // 🔹 Handle play/pause and source changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Playback failed:", error);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, audioSrc]);

  // 🔹 Reset UI on song change and set random gradient
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    generateGradient();
  }, [currentSong]);



  // 🔹 Handle seeking
  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  // 🔹 Format time helper (MM:SS)
  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (!currentSong || !audioSrc) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-gray-900 text-white rounded-xl">
        Select a song to play 🎵
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @keyframes liquid {
          0% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
             border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
        }
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .liquid-ring {
          position: absolute;
          border: 2px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.2);
          opacity: 0.6;
          animation: liquid 6s ease-in-out infinite, rotate 12s linear infinite;
        }
      `}</style>

      <div
        className="relative h-[360px] text-white rounded-xl p-6 flex gap-8 transition-all duration-700 ease-in-out overflow-hidden"
        style={{ background: bgGradient }}
      >
        {/* Neon Liquid Wave Visualizer */}
        {showVisualizer && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
            {/* Dynamic waves with slight random delays/sizes */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="liquid-ring"
                style={{
                  width: `${350 + i * 50}px`,
                  height: `${350 + i * 50}px`,
                  borderColor: `hsl(${(i * 50 + 100) % 360}, 80%, 60%)`,
                  boxShadow: `0 0 15px hsl(${(i * 50 + 100) % 360}, 80%, 60%)`,
                  animationDelay: `${i * -1.5}s, ${i * -2}s`,
                  animationDuration: `${7 + i}s, ${15 + i * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onEnded={onNext}
        />

        {/* Album Art - Increased Size */}
        <div className="relative w-80 h-full shadow-2xl rounded-lg overflow-hidden group flex-shrink-0 z-20 transition-transform hover:scale-[1.02]">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Controls & Details */}
        <div
          className={`flex-1 flex flex-col justify-center space-y-4 z-20 relative p-4 rounded-xl transition-all duration-300 ${showVisualizer ? "" : "bg-black/20 backdrop-blur-sm"
            }`}
        >
          <div className="space-y-1">
            <h1 className="text-3xl font-bold drop-shadow-lg line-clamp-1">
              {title}
            </h1>
            <p className="text-sm text-gray-300 line-clamp-2 max-w-lg">
              {description}
            </p>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-between pr-4">
            <div className="flex items-center gap-6">
              <button
                onClick={onPrev}
                className="text-white/70 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <FaStepBackward size={24} />
              </button>

              <button
                onClick={onTogglePlay}
                className="bg-white text-black p-4 rounded-full hover:scale-110 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 active:scale-95"
              >
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
              </button>

              <button
                onClick={onNext}
                className="text-white/70 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <FaStepForward size={24} />
              </button>
            </div>

            {/* Extra Features: Gradient & Visualizer */}
            <div className="flex items-center gap-3">
              <button
                onClick={generateGradient}
                title="Change Theme Color"
                className={`p-3 rounded-full hover:scale-105 transition-all text-sm ${showVisualizer
                    ? "bg-transparent hover:bg-white/10"
                    : "bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                  }`}
              >
                <FaPalette size={16} />
              </button>
              <button
                onClick={() => setShowVisualizer(!showVisualizer)}
                title="Toggle Visualizer"
                className={`p-3 rounded-full hover:scale-105 transition-all text-sm ${showVisualizer
                    ? "bg-green-400 text-black shadow-[0_0_15px_rgba(74,222,128,0.6)]"
                    : "bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                  }`}
              >
                <FaMagic size={16} />
              </button>
            </div>
          </div>

          {/* 🔹 Progress Bar & Time */}
          <div className="w-full space-y-2 pr-4">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white hover:h-2 transition-all duration-300"
            />
            <div className="flex justify-between text-xs font-medium opacity-80">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
