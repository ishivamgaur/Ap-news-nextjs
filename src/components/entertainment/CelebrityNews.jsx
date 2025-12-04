"use client";

import Image from "next/image";

const news = [
  {
    id: 1,
    title: "Deepika Padukone at Oscars 2024",
    category: "Fashion",
    time: "2 hours ago",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Virat and Anushka's Vacation Photos",
    category: "Lifestyle",
    time: "5 hours ago",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Alia Bhatt's New Project Announced",
    category: "Movies",
    time: "1 day ago",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Ranveer Singh's Energetic Performance",
    category: "Events",
    time: "1 day ago",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop",
  },
];

export default function CelebrityNews() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {news.map((item) => (
        <div key={item.id} className="group cursor-pointer space-y-3">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
            <div className="absolute bottom-3 left-3 right-3">
              <span className="inline-block bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2">
                {item.category}
              </span>
              <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 group-hover:underline decoration-white/50 underline-offset-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-[10px] mt-1">{item.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
