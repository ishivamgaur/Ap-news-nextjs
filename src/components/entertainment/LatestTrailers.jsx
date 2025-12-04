"use client";

import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const trailers = [
  {
    id: 1,
    title: "Dune: Part Two",
    thumbnail:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1376&auto=format&fit=crop",
    duration: "2:30",
  },
  {
    id: 2,
    title: "Oppenheimer",
    thumbnail:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1470&auto=format&fit=crop",
    duration: "3:05",
  },
  {
    id: 3,
    title: "Mission: Impossible 7",
    thumbnail:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1325&auto=format&fit=crop",
    duration: "2:15",
  },
  {
    id: 4,
    title: "Barbie",
    thumbnail:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1470&auto=format&fit=crop",
    duration: "1:55",
  },
  {
    id: 5,
    title: "The Marvels",
    thumbnail:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1374&auto=format&fit=crop",
    duration: "2:10",
  },
  {
    id: 6,
    title: "Aquaman and the Lost Kingdom",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1368&auto=format&fit=crop",
    duration: "2:25",
  },
  {
    id: 7,
    title: "Hunger Games: Ballad of Songbirds",
    thumbnail:
      "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?q=80&w=1374&auto=format&fit=crop",
    duration: "2:40",
  },
  {
    id: 8,
    title: "Wonka",
    thumbnail:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1470&auto=format&fit=crop",
    duration: "2:15",
  },
  {
    id: 9,
    title: "Napoleon",
    thumbnail:
      "https://images.unsplash.com/photo-1598518619679-584fbddb7f25?q=80&w=1374&auto=format&fit=crop",
    duration: "2:50",
  },
  {
    id: 10,
    title: "Killers of the Flower Moon",
    thumbnail:
      "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?q=80&w=1374&auto=format&fit=crop",
    duration: "2:35",
  },
];

export default function LatestTrailers() {
  return (
    <div className="space-y-4 relative group">
      <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
        Latest Trailers
      </h2>
      <div className="px-1">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="!pb-4"
        >
          {trailers.map((trailer) => (
            <SwiperSlide key={trailer.id}>
              <div className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={trailer.thumbnail}
                  alt={trailer.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 p-3 rounded-full opacity-80 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                    <FaPlay className="text-red-600 w-4 h-4 ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                  {trailer.duration}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-sm font-semibold truncate">
                    {trailer.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 32px !important;
          height: 32px !important;
          padding: 10px;
          font-weight: bold;
          background: rgba(220, 20, 0, 1);
          border-radius: 50%;
          color: white !important;
          backdrop-filter: blur(4px);
          z-index: 50;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 14px !important;
          font-weight: bolder;
        }
      `}</style>
    </div>
  );
}
