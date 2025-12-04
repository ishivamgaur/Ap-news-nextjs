"use client";

import { useState, useEffect } from "react";
import {
  FaPlay,
  FaMusic,
  FaInfoCircle,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import Image from "next/image";

const featuredContent = [
  {
    id: 1,
    type: "video",
    title: "The Future of Streaming",
    subtitle: "Exclusive Documentary",
    description:
      "Dive deep into how streaming technology is reshaping the entertainment landscape in this exclusive AP News documentary.",
    image:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1469&auto=format&fit=crop",
    duration: "45 min",
  },
  {
    id: 2,
    type: "audio",
    title: "Top Hits of the Week",
    subtitle: "Curated Playlist",
    description:
      "Listen to the trending tracks that are topping the charts globally. A mix of pop, rock, and indie vibes.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1470&auto=format&fit=crop",
    duration: "1 hr 20 min",
  },
  {
    id: 3,
    type: "video",
    title: "Behind the Scenes: Election coverage",
    subtitle: "Special Report",
    description:
      "An inside look at how our team covers the biggest elections around the world. Unfiltered and raw.",
    image:
      "https://images.unsplash.com/photo-1541872703-74c5963631df?q=80&w=1470&auto=format&fit=crop",
    duration: "25 min",
  },
];

export default function EntertainmentHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredContent.length) % featuredContent.length
    );
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeContent = featuredContent[currentSlide];

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl group">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 transition-all duration-700 ease-in-out">
        <Image
          src={activeContent.image}
          alt={activeContent.title}
          fill
          className="object-cover blur-sm scale-105 opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Main Content Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-10">
        <div className="max-w-3xl space-y-4 animate-fade-in-up">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-red-600 rounded-full">
              {activeContent.type}
            </span>
            <span className="text-gray-300 text-sm font-medium">
              {activeContent.subtitle}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
            {activeContent.title}
          </h1>

          <p className="text-lg text-gray-200 line-clamp-2 max-w-2xl drop-shadow-md">
            {activeContent.description}
          </p>

          <div className="flex items-center space-x-4 pt-4">
            <button className="flex items-center space-x-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors transform hover:scale-105 active:scale-95">
              {activeContent.type === "video" ? (
                <FaPlay className="w-5 h-5 fill-current" />
              ) : (
                <FaMusic className="w-5 h-5 fill-current" />
              )}
              <span>
                {activeContent.type === "video" ? "Watch Now" : "Listen Now"}
              </span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition-colors border border-white/20">
              <FaInfoCircle className="w-5 h-5" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 flex space-x-2 z-20">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/20"
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/20"
        >
          <FaChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-red-600"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
