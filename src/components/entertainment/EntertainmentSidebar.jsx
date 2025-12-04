"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaVideo,
  FaTv,
  FaMusic,
  FaFilm,
  FaStar,
  FaBroadcastTower,
  FaCompass,
} from "react-icons/fa";

const sidebarItems = [
  {
    name: "Videos",
    path: "/entertainment/videos",
    icon: FaVideo,
    color: "text-blue-500",
    bg: "bg-blue-400",
    itembg: "bg-blue-400/10",
  },
  {
    name: "Shorts",
    path: "/entertainment/shorts",
    icon: FaFilm,
    color: "text-red-500",
    bg: "bg-red-400",
    itembg: "bg-red-400/10",
  },
  {
    name: "Movies",
    path: "/entertainment/movies",
    icon: FaFilm,
    color: "text-purple-500",
    bg: "bg-purple-400",
    itembg: "bg-purple-400/10",
  },
  {
    name: "Shows",
    path: "/entertainment/shows",
    icon: FaTv,
    color: "text-green-500",
    bg: "bg-green-400",
    itembg: "bg-green-400/10",
  },
  {
    name: "Music",
    path: "/entertainment/music",
    icon: FaMusic,
    color: "text-pink-500",
    bg: "bg-pink-400",
    itembg: "bg-pink-400/10",
  },
  {
    name: "Radio",
    path: "/entertainment/radio",
    icon: FaBroadcastTower,
    color: "text-orange-500",
    bg: "bg-orange-400",
    itembg: "bg-orange-400/10",
  },
  {
    name: "Celebrity",
    path: "/entertainment/celebrity",
    icon: FaStar,
    color: "text-yellow-500",
    bg: "bg-yellow-500",
    itembg: "bg-yellow-500/10",
  },
];

export default function EntertainmentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 h-fit lg:sticky lg:top-24 space-y-6">
      {/* Navigation Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <FaCompass className="text-red-500" /> Explore
          </h2>
        </div>

        <nav className="p-2 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? `${item.bg} text-white shadow-md transform scale-100`
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1"
                }`}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-500 rounded-r-full" />
                )}

                {/* Icon Container */}
                <div
                  className={`p-2 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "bg-white/10 text-white"
                      : `${item.itembg} ${item.color}`
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                </div>

                <span className="font-semibold tracking-wide">{item.name}</span>

                {/* Hover Arrow */}
                {!isActive && (
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 text-xs">
                    →
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
