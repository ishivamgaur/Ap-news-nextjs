"use client";

import { FaPlay, FaPause } from "react-icons/fa";
import Image from "next/image";

export default function TrendingSongs({
  songs,
  currentSong,
  isPlaying,
  onPlay,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-red-600 text-2xl">♪</span>
          <span>Trending Songs</span>
        </h2>
        <button className="text-xs text-red-600 font-bold hover:underline uppercase tracking-wide">
          Play All
        </button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {songs.map((song) => {
          const isCurrentSong = currentSong?.id === song.id;
          const isSongPlaying = isCurrentSong && isPlaying;

          return (
            <div
              key={song.id}
              onClick={() => onPlay(song)}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Background Image */}
              <Image
                src={song.cover}
                alt={song.title}
                fill
                className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                  isSongPlaying ? "scale-110" : ""
                }`}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Play Button (Centered, appears on hover or when playing) */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${
                  isSongPlaying
                    ? "opacity-100 scale-100"
                    : "opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100"
                }`}
              >
                <div className="bg-red-600 text-white p-3 rounded-full shadow-lg">
                  {isSongPlaying ? (
                    <FaPause className="w-5 h-5" />
                  ) : (
                    <FaPlay className="w-5 h-5 pl-1" />
                  )}
                </div>
              </div>

              {/* Visualizer (when playing) */}
              {isSongPlaying && (
                <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1 h-8 items-end px-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-red-500 animate-pulse"
                      style={{
                        height: `${Math.random() * 80 + 20}%`,
                        animationDuration: `${Math.random() * 0.4 + 0.3}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Content (Bottom) */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3
                  className={`font-bold text-sm truncate drop-shadow-md ${
                    isSongPlaying ? "text-red-400" : "text-white"
                  }`}
                >
                  {song.title}
                </h3>
                <p className="text-gray-300 text-xs truncate drop-shadow-sm">
                  {song.artist}
                </p>
              </div>

              {/* Duration Badge (Top Right) */}
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {song.duration}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
