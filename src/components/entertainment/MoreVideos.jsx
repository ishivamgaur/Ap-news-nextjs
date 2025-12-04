"use client";

import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const videos = [
  {
    id: 1,
    title: "Behind the Scenes: Jawan",
    views: "1.2M views",
    thumbnail:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1470&auto=format&fit=crop",
    duration: "10:23",
  },
  {
    id: 2,
    title: "Top 10 Action Movies of 2023",
    views: "850K views",
    thumbnail:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1325&auto=format&fit=crop",
    duration: "12:45",
  },
  {
    id: 3,
    title: "Exclusive Interview with Alia Bhatt",
    views: "2.5M views",
    thumbnail:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop",
    duration: "15:30",
  },
  {
    id: 4,
    title: "Funny Bloopers from Pathaan",
    views: "500K views",
    thumbnail:
      "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1374&auto=format&fit=crop",
    duration: "5:12",
  },
  {
    id: 5,
    title: "Music Launch Event Highlights",
    views: "300K views",
    thumbnail:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1470&auto=format&fit=crop",
    duration: "8:20",
  },
  {
    id: 6,
    title: "Red Carpet Fashion Review",
    views: "150K views",
    thumbnail:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1470&auto=format&fit=crop",
    duration: "6:45",
  },
  {
    id: 7,
    title: "Best VFX Breakdowns 2024",
    views: "900K views",
    thumbnail:
      "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=1464&auto=format&fit=crop",
    duration: "14:20",
  },
  {
    id: 8,
    title: "Celebrity Workout Routines",
    views: "450K views",
    thumbnail:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop",
    duration: "9:15",
  },
  {
    id: 9,
    title: "Inside the Studio: Music Production",
    views: "600K views",
    thumbnail:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1470&auto=format&fit=crop",
    duration: "11:30",
  },
  {
    id: 10,
    title: "Comedy Skit Compilation",
    views: "1.5M views",
    thumbnail:
      "https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=1471&auto=format&fit=crop",
    duration: "8:50",
  },
];

export default function MoreVideos() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
        More Videos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="group cursor-pointer space-y-2">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-sm">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 p-2 rounded-full shadow-lg">
                  <FaPlay className="text-red-600 w-3 h-3 ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                {video.duration}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-red-700 transition-colors">
                {video.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{video.views}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
