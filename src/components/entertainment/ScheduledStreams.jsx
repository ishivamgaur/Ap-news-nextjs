"use client";

import { FaClock, FaVideo, FaBell } from "react-icons/fa";
import Image from "next/image";

const scheduledContent = [
  {
    id: 1,
    title: "Morning News Roundup",
    time: "08:00 AM",
    host: "Anjali Singh",
    thumbnail:
      "https://images.unsplash.com/photo-1495020686667-45b86332e491?q=80&w=1471&auto=format&fit=crop",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Tech Talk Weekly",
    time: "02:00 PM",
    host: "Ravi Kumar",
    thumbnail:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop",
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Bollywood Buzz",
    time: "06:00 PM",
    host: "Priya Sharma",
    thumbnail:
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1456&auto=format&fit=crop",
    status: "Scheduled",
  },
  {
    id: 4,
    title: "Sports Night Live",
    time: "09:00 PM",
    host: "Vikram Das",
    thumbnail:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1470&auto=format&fit=crop",
    status: "Scheduled",
  },
];

export default function ScheduledStreams() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaClock className="text-red-600" />
          <span>Scheduled Streams</span>
        </h2>
        <button className="text-sm text-red-600 font-semibold hover:underline">
          View Full Schedule
        </button>
      </div>

      <div className="space-y-4">
        {scheduledContent.map((item) => (
          <div
            key={item.id}
            className="group flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100"
          >
            <div className="relative w-24 h-16 shrink-0 overflow-hidden rounded-md">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaVideo className="text-white w-6 h-6 drop-shadow-md" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                  {item.time}
                </span>
                <button
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  title="Remind Me"
                >
                  <FaBell size={14} />
                </button>
              </div>
              <h3 className="text-sm font-bold text-gray-900 truncate mt-1 group-hover:text-red-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                Host: {item.host}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
