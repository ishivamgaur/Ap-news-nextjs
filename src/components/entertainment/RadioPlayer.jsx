"use client";

import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaBroadcastTower } from "react-icons/fa";
import Image from "next/image";

const stations = [
  {
    id: 1,
    name: "Lofi Hip Hop",
    tagline: "Beats to Relax/Study to",
    genre: "Lofi",
    url: "https://stream.zeno.fm/0r0xa792kwzuv", // Lofi Girl mirror or similar
    image:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1470&auto=format&fit=crop",
    color: "bg-purple-600",
  },
  {
    id: 2,
    name: "BBC World Service",
    tagline: "Global News & Reports",
    genre: "News",
    url: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1470&auto=format&fit=crop",
    color: "bg-red-600",
  },
  {
    id: 3,
    name: "Smooth Jazz",
    tagline: "Relaxing Jazz Classics",
    genre: "Jazz",
    url: "https://smoothjazz.cdnstream1.com/2585_128.mp3",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1632&auto=format&fit=crop",
    color: "bg-yellow-600",
  },
  {
    id: 4,
    name: "Classic Rock",
    tagline: "Legends of Rock",
    genre: "Rock",
    url: "https://stream.radioparadise.com/rock-128",
    image:
      "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1470&auto=format&fit=crop",
    color: "bg-blue-600",
  },
  {
    id: 5,
    name: "Top 40 Hits",
    tagline: "Today's Biggest Hits",
    genre: "Pop",
    url: "https://icecast.thisisdax.com/CapitalUK",
    image:
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1470&auto=format&fit=crop",
    color: "bg-pink-600",
  },
  {
    id: 6,
    name: "Ambient Sleep",
    tagline: "Deep Sleep Music",
    genre: "Ambient",
    url: "http://radio.stereoscenic.com/asp-h",
    image:
      "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1364&auto=format&fit=crop",
    color: "bg-indigo-600",
  },
];

export default function RadioPlayer() {
  const [currentStation, setCurrentStation] = useState(stations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch((e) => console.error("Play error:", e));
    }
  }, [currentStation]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStationChange = (station) => {
    if (currentStation.id === station.id) {
      togglePlay();
    } else {
      setCurrentStation(station);
      setIsPlaying(true);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="space-y-8">
      {/* Main Player Hero */}
      <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-2xl bg-gray-900 text-white flex flex-col items-center justify-center p-8 text-center group">
        <audio ref={audioRef} src={currentStation.url} />

        {/* Background Image */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src={currentStation.image}
            alt={currentStation.name}
            fill
            className="object-cover blur-sm transition-opacity duration-700"
            key={currentStation.image}
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 space-y-6 animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 text-red-500 font-bold tracking-widest uppercase text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
            Live Radio
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter drop-shadow-lg">
              {currentStation.name}
            </h1>
            <p className="text-xl text-gray-300 font-medium tracking-wide">
              {currentStation.tagline}
            </p>
          </div>

          {/* Visualizer (CSS Animation) */}
          <div className="h-16 flex items-center justify-center gap-1.5">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`w-2 rounded-full ${
                  isPlaying ? "bg-white animate-pulse" : "bg-gray-600"
                }`}
                style={{
                  height: isPlaying ? "60%" : "10%", // Fixed height to prevent hydration error
                  animationDuration: `${0.5 + (i % 3) * 0.2}s`, // Deterministic duration
                  animationDelay: `${i * 0.1}s`, // Deterministic delay
                }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 pt-4">
            <button
              onClick={togglePlay}
              className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95"
            >
              {isPlaying ? (
                <FaPause className="w-8 h-8" />
              ) : (
                <FaPlay className="w-8 h-8 ml-1" />
              )}
            </button>
            <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <FaVolumeUp className="text-gray-300" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 accent-white cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Station Grid */}
      <div className="space-y-8">
        <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3 flex items-center gap-2">
          <FaBroadcastTower /> Popular Stations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {stations.map((station) => {
            const isActive = currentStation.id === station.id;
            return (
              <div
                key={station.id}
                onClick={() => handleStationChange(station)}
                className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 ${
                  isActive
                    ? "ring-4 ring-red-500 scale-105 shadow-xl"
                    : "hover:scale-105 hover:shadow-lg"
                }`}
              >
                <Image
                  src={station.image}
                  alt={station.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                {/* Overlay Info */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-white">
                  {isActive && isPlaying && (
                    <div className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                  )}
                  <div
                    className={`p-3 rounded-full bg-white/10 backdrop-blur-md mb-2 ${
                      isActive ? "bg-red-600 text-white" : ""
                    }`}
                  >
                    {isActive && isPlaying ? <FaPause /> : <FaPlay />}
                  </div>
                  <h3 className="font-bold text-sm leading-tight drop-shadow-md">
                    {station.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider opacity-80 mt-1">
                    {station.genre}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
