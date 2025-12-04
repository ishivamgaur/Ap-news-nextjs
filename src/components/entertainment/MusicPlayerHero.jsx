"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaHeart,
  FaVolumeUp,
} from "react-icons/fa";
import Image from "next/image";

export default function MusicPlayerHero({
  currentSong,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);

  // Handle Audio Playback
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Playback prevented:", error);
          });
        }
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, currentSong]); // Re-run when playing state or song changes

  // Handle Song Change (Reset Time)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  }, [currentSong]);

  // Event Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => {
        if (!isNaN(audio.duration)) {
          setDuration(audio.duration);
        }
      };
      const handleEnded = () => onNext(); // Auto-play next song

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("durationchange", updateDuration);
      audio.addEventListener("ended", handleEnded);

      // Check if metadata is already loaded
      if (audio.readyState >= 1) {
        updateDuration();
      }

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("durationchange", updateDuration);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [onNext, currentSong]); // Added currentSong to dependency to ensure re-check on song change

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e) => {
    if (progressBarRef.current && audioRef.current && duration > 0) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = Math.max(0, Math.min(1, x / width));
      const seekTime = percentage * duration;

      if (isFinite(seekTime)) {
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
      }
    }
  };

  const handleVolumeChange = (e) => {
    if (volumeBarRef.current && audioRef.current) {
      const rect = volumeBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const newVolume = Math.max(0, Math.min(1, x / width));

      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  if (!currentSong) return null;

  return (
    <div
      className={`relative w-full h-[400px] overflow-hidden rounded-2xl shadow-2xl bg-linear-to-br ${
        currentSong.gradient || "from-gray-900"
      } via-black to-black text-white p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 transition-colors duration-1000`}
    >
      <audio ref={audioRef} src={currentSong.audio} preload="metadata" />

      {/* Background Blur Effect */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Image
          src={currentSong.cover}
          alt="Background"
          fill
          className="object-cover blur-3xl transition-opacity duration-1000"
          key={currentSong.cover} // Force re-render for transition
        />
      </div>

      {/* Album Art */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 shadow-2xl rounded-xl overflow-hidden group z-10">
        <Image
          src={currentSong.cover}
          alt={currentSong.title}
          fill
          className={`object-cover transition-transform duration-500 ${
            isPlaying ? "scale-110" : "scale-100"
          }`}
        />
        {/* Visualizer Overlay (Fake) */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-end justify-center gap-1 pb-4 bg-black/20">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 bg-white/80 animate-pulse"
                style={{
                  height: `${Math.random() * 40 + 10}%`,
                  animationDuration: `${Math.random() * 0.5 + 0.5}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Player Controls & Info */}
      <div className="flex-1 w-full z-10 space-y-6">
        <div className="space-y-2 animate-fade-in-up">
          <span
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ${
              currentSong.color || "bg-gray-600"
            } rounded-full transition-colors duration-500`}
          >
            Now Playing
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight truncate">
            {currentSong.title}
          </h1>
          <p className="text-xl text-gray-300 font-medium truncate">
            {currentSong.artist} • {currentSong.album}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-2">
          <div
            ref={progressBarRef}
            className="w-full h-6 cursor-pointer group flex items-center"
            onClick={handleSeek}
          >
            {/* Visual Track */}
            <div className="w-full h-1.5 bg-gray-800 rounded-full relative">
              {/* Filled Part */}
              <div
                className={`h-full rounded-full relative ${
                  currentSong.color || "bg-white"
                } transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(255,255,255,0.5)]`}
                style={{
                  width: `${
                    duration > 0 ? (currentTime / duration) * 100 : 0
                  }%`,
                }}
              />
              {/* Thumb */}
              <div
                className="w-4 h-4 bg-white rounded-full absolute top-1/2 -translate-y-1/2 shadow-lg pointer-events-none ring-2 ring-black/20 transition-transform hover:scale-125"
                style={{
                  left: `calc(${
                    duration > 0 ? (currentTime / duration) * 100 : 0
                  }% - 8px)`,
                }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-300 font-bold tracking-wide">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between md:justify-start md:gap-12">
          <div className="flex items-center gap-6">
            <button
              onClick={onPrev}
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 active:scale-95"
            >
              <FaStepBackward className="w-8 h-8" />
            </button>
            <button
              onClick={onTogglePlay}
              className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-white/20 active:scale-95"
            >
              {isPlaying ? (
                <FaPause className="w-6 h-6" />
              ) : (
                <FaPlay className="w-6 h-6 ml-1" />
              )}
            </button>
            <button
              onClick={onNext}
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 active:scale-95"
            >
              <FaStepForward className="w-8 h-8" />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110">
              <FaHeart className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 text-gray-400 group">
              <FaVolumeUp className="w-5 h-5 group-hover:text-white transition-colors" />
              <div
                ref={volumeBarRef}
                className="w-24 h-6 flex items-center cursor-pointer"
                onClick={handleVolumeChange}
              >
                <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="bg-gray-400 h-full rounded-full group-hover:bg-white transition-colors"
                    style={{ width: `${volume * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
