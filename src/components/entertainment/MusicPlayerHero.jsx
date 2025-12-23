"use client";

import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
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
 

  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 🔹 Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    if (isPlaying) {
      audio.play().catch(() => { });
    } else {
      audio.pause();
    }
  }, [isPlaying, audioSrc]);

  // 🔹 Reset on song change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  }, [currentSong]);

  if (!currentSong || !audioSrc) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-gray-900 text-white rounded-xl">
        Select a song to play 🎵
      </div>
    );
  }

  return (
    <div className="relative h-[400px] bg-black text-white rounded-xl p-8 flex gap-10">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={onNext}
      />

      <div className="relative w-64 h-64">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 space-y-6">
        <h1 className="text-3xl font-bold">{title}</h1>

        <div className="flex items-center gap-6">
          <button onClick={onPrev}>
            <FaStepBackward />
          </button>

          <button
            onClick={onTogglePlay}
            className="bg-white text-black p-4 rounded-full"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button onClick={onNext}>
            <FaStepForward />
          </button>
        </div>

        <div className="text-sm opacity-70">
          {Math.floor(currentTime)} / {Math.floor(duration)} sec
        </div>
      </div>
    </div>
  );
}
