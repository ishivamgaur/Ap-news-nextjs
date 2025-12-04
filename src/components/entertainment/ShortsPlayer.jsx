"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaHeart, FaComment, FaShare, FaPlay, FaPause } from "react-icons/fa";
import Image from "next/image";

const shorts = [
  {
    id: 1,
    title: "Amazing Dance Moves!",
    user: "@dancer_girl",
    likes: "1.2M",
    comments: "5.4K",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1376&auto=format&fit=crop",
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", // Vertical-ish sample
  },
  {
    id: 2,
    title: "Funny Cat Video 🐱",
    user: "@cat_lover",
    likes: "850K",
    comments: "2.1K",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1443&auto=format&fit=crop",
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 3,
    title: "Travel Goals 2024",
    user: "@travel_addict",
    likes: "2.5M",
    comments: "10K",
    image:
      "https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?q=80&w=1364&auto=format&fit=crop",
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 4,
    title: "Cooking Hacks",
    user: "@chef_master",
    likes: "500K",
    comments: "1.5K",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1470&auto=format&fit=crop",
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
];

export default function ShortsPlayer() {
  const [playingId, setPlayingId] = useState(null);
  const videoRefs = useRef({});

  const handlePlayToggle = (id) => {
    if (playingId === id) {
      // Pause current
      if (videoRefs.current[id]) {
        videoRefs.current[id].pause();
      }
      setPlayingId(null);
    } else {
      // Pause previous if any
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId].pause();
      }
      // Play new
      if (videoRefs.current[id]) {
        videoRefs.current[id].play();
      }
      setPlayingId(id);
    }
  };

  return (
    <div className="h-[70vh] w-full rounded-2xl overflow-hidden shadow-2xl px-12 py-10 relative group">
      <Swiper
        direction={"horizontal"}
        modules={[Navigation, Pagination]}
        className="h-full w-full"
        spaceBetween={20}
        slidesPerView={1}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {shorts.map((short) => (
          <SwiperSlide
            key={short.id}
            className="relative h-full w-full rounded-xl overflow-hidden border border-gray-800 bg-black"
          >
            {/* Video Element */}
            <video
              ref={(el) => (videoRefs.current[short.id] = el)}
              src={short.video}
              className="absolute inset-0 w-full h-full object-cover"
              loop
              playsInline
              onClick={() => handlePlayToggle(short.id)}
            />

            {/* Overlay Gradient (only visible when paused or for text readability) */}
            <div
              className={`absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/80 pointer-events-none transition-opacity duration-300 ${
                playingId === short.id ? "opacity-60" : "opacity-100"
              }`}
            />

            {/* Play Button (Center) */}
            <div
              className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
                playingId === short.id ? "opacity-0" : "opacity-100"
              }`}
            >
              <FaPlay className="text-white/80 w-12 h-12 drop-shadow-lg" />
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-2 bottom-20 flex flex-col items-center gap-4 text-white z-10">
              <div className="flex flex-col items-center gap-1">
                <div className="bg-gray-800/50 p-2 rounded-full hover:bg-gray-700/50 transition-colors cursor-pointer backdrop-blur-sm">
                  <FaHeart className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold">{short.likes}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-gray-800/50 p-2 rounded-full hover:bg-gray-700/50 transition-colors cursor-pointer backdrop-blur-sm">
                  <FaComment className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold">{short.comments}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-gray-800/50 p-2 rounded-full hover:bg-gray-700/50 transition-colors cursor-pointer backdrop-blur-sm">
                  <FaShare className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold">Share</span>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-4 left-3 right-12 text-white z-10 pointer-events-none">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-gray-300 rounded-full overflow-hidden relative">
                  <Image
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${short.user}`}
                    alt={short.user}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-bold text-xs">{short.user}</span>
              </div>
              <p className="text-xs font-medium line-clamp-2">{short.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          position: absolute !important;
          padding: 10px !important;
          top: 50%;
          transform: translateY(-50%);
          color: white !important;
          background: rgba(220, 20, 0, 1);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
          z-index: 50;
          font-weight: bold;
        }
        .swiper-button-prev {
          left: 8px !important;
        }
        .swiper-button-next {
          right: 8px !important;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: bolder;
        }
      `}</style>
    </div>
  );
}
