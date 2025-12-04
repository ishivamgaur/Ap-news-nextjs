"use client";

import { useState, useRef } from "react";
import { FaPlay, FaStar, FaInfoCircle } from "react-icons/fa";
import Image from "next/image";

export default function FeaturedMovieHero() {
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
            src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1470&auto=format&fit=crop"
            alt="Featured Movie"
            fill
            className="object-cover"
            priority
          />
        )}
        <video
          ref={videoRef}
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          className={`absolute inset-0 w-full h-full object-cover ${
            isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          controls={isPlaying}
          onEnded={() => setIsPlaying(false)}
        />
        <div
          className={`absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent ${
            isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
          } transition-opacity duration-500`}
        />
      </div>

      {/* Content */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10 transition-opacity duration-500 ${
          isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="max-w-3xl space-y-4 animate-fade-in-up">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-red-600 rounded-full">
              Featured Movie
            </span>
            <div className="flex items-center text-yellow-400 gap-1">
              <FaStar />
              <span className="text-white font-bold">8.0</span>
            </div>
            <span className="text-gray-300 text-sm font-medium">
              Action • Adventure • Sci-Fi
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
            Guardians of the Galaxy Vol. 3
          </h1>

          <p className="text-lg text-gray-200 line-clamp-2 max-w-2xl drop-shadow-md">
            Still reeling from the loss of Gamora, Peter Quill rallies his team
            to defend the universe and one of their own - a mission that could
            mean the end of the Guardians if not successful.
          </p>

          <div className="flex items-center space-x-4 pt-4">
            <button
              onClick={handlePlay}
              className="flex items-center space-x-2 px-8 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/30"
            >
              <FaPlay className="w-5 h-5" />
              <span>Watch Trailer</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition-colors border border-white/20">
              <FaInfoCircle className="w-5 h-5" />
              <span>Read Review</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
