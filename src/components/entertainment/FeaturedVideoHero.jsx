"use client";

import { useState, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaInfoCircle,
} from "react-icons/fa";
import Image from "next/image";

export default function FeaturedVideoHero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl group">
      {/* Background Video/Image */}
      <div className="absolute inset-0 bg-black">
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
          loop
          playsInline
          muted={isMuted}
        />
        <Image
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1625&auto=format&fit=crop"
          alt="Featured Video Background"
          fill
          className={`object-cover transition-opacity duration-700 ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
        <div className="max-w-3xl space-y-4 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
              Featured
            </span>
            <span className="text-gray-300 text-sm font-medium">
              Sci-Fi • Action • 12m
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
            Tears of Steel
          </h1>

          <p className="text-lg text-gray-200 line-clamp-2 md:line-clamp-3 max-w-2xl drop-shadow-md">
            In a dystopian future, a group of resistance fighters attempts to
            save the world from giant robots by sending a message back in time.
            A visually stunning open movie project.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={handlePlay}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors transform hover:scale-105 active:scale-95"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
              {isPlaying ? "Pause" : "Watch Now"}
            </button>
            <button className="flex items-center gap-2 bg-gray-500/30 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold hover:bg-gray-500/50 transition-colors border border-white/20">
              <FaInfoCircle />
              More Info
            </button>
            {isPlaying && (
              <button
                onClick={toggleMute}
                className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors border border-white/10 ml-auto md:ml-0"
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
