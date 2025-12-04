"use client";

import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    rating: 8.8,
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1376&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Oppenheimer",
    rating: 8.6,
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Spider-Man: Across the Spider-Verse",
    rating: 8.7,
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1325&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Barbie",
    rating: 7.0,
    image:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Guardians of the Galaxy Vol. 3",
    rating: 8.0,
    image:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Avatar: The Way of Water",
    rating: 7.8,
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1368&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "The Batman",
    rating: 7.9,
    image:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cd4?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Top Gun: Maverick",
    rating: 8.3,
    image:
      "https://images.unsplash.com/photo-1559583109-3e79eb8fa668?q=80&w=1471&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Black Panther: Wakanda Forever",
    rating: 7.4,
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1374&auto=format&fit=crop",
  },
  {
    id: 10,
    title: "Doctor Strange in the Multiverse of Madness",
    rating: 7.0,
    image:
      "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=1480&auto=format&fit=crop",
  },
];

export default function PopularMovies() {
  return (
    <div className="space-y-4 relative group">
      <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
        Popular Movies
      </h2>
      <div className="px-1">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          navigation
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="!pb-4"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="cursor-pointer">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                  <FaStar /> {movie.rating}
                </div>
              </div>
              <h3 className="mt-2 text-sm font-bold text-gray-900 line-clamp-1 hover:text-red-700 transition-colors">
                {movie.title}
              </h3>
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
