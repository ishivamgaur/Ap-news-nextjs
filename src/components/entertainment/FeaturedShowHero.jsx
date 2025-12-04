"use client";

import { useState, useRef } from "react";
import { FaPlay, FaPlus, FaTv } from "react-icons/fa";
import Image from "next/image";

export default function FeaturedShowHero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl group">
      {/* Background Image or Video */}
      <div className="absolute inset-0">
        {!isPlaying && (
          <Image
            src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1469&auto=format&fit=crop"
            alt="Featured Show"
            fill
            className="object-cover"
            priority
          />
        )}
        <video
          ref={videoRef}
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          className={`absolute inset-0 w-full h-full object-cover ${
            isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          controls={isPlaying}
          onEnded={() => setIsPlaying(false)}
        />
        <div
          className={`absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent ${
            isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
          } transition-opacity duration-500`}
        />
      </div>

      {/* Content */}
      <div
        className={`absolute inset-0 flex items-center p-8 md:p-16 z-10 transition-opacity duration-500 ${
          isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="max-w-2xl space-y-6 animate-fade-in-up">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 rounded-full flex items-center gap-2">
              <FaTv /> New Season
            </span>
            <span className="text-gray-300 text-sm font-medium">
              Documentary • Tech • Future
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
            The Future of Streaming
          </h1>

          <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
            <span className="text-green-400">98% Match</span>
            <span>2024</span>
            <span className="border border-gray-500 px-1 rounded text-xs">
              TV-MA
            </span>
            <span>1 Season</span>
          </div>

          <p className="text-lg text-gray-200 line-clamp-3 drop-shadow-md">
            Dive deep into how streaming technology is reshaping the
            entertainment landscape. From the rise of digital platforms to the
            fall of traditional cable, witness the revolution that changed how
            we consume media forever.
          </p>

          <div className="flex items-center space-x-4 pt-2">
            <button
              onClick={handlePlay}
              className="flex items-center space-x-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors transform hover:scale-105 active:scale-95"
            >
              <FaPlay className="w-5 h-5" />
              <span>Watch Episode 1</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition-colors border border-white/20">
              <FaPlus className="w-5 h-5" />
              <span>My List</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
