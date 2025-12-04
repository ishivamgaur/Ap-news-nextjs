"use client";

import { FaStar } from "react-icons/fa";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    title: "Jawan: A Mass Entertainer",
    movie: "Jawan",
    rating: 4.5,
    author: "Rohit Gupta",
    image:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1470&auto=format&fit=crop",
    excerpt:
      "Shah Rukh Khan delivers a powerful performance in this action-packed thriller that keeps you on the edge of your seat.",
  },
  {
    id: 2,
    title: "Rocky Aur Rani: Classic Bollywood",
    movie: "Rocky Aur Rani Kii Prem Kahaani",
    rating: 4.0,
    author: "Sneha Reddy",
    image:
      "https://images.unsplash.com/photo-1517604931442-71053e3e2e3c?q=80&w=1470&auto=format&fit=crop",
    excerpt:
      "Karan Johar returns with a family drama that is both nostalgic and refreshing, featuring stellar performances.",
  },
  {
    id: 3,
    title: "OMG 2: Thought Provoking",
    movie: "OMG 2",
    rating: 4.2,
    author: "Vikram Singh",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1325&auto=format&fit=crop",
    excerpt:
      "A bold and important film that tackles a sensitive subject with humor and grace. Pankaj Tripathi is brilliant.",
  },
];

export default function MovieReviews() {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="relative w-full md:w-48 h-32 shrink-0 rounded-lg overflow-hidden">
            <Image
              src={review.image}
              alt={review.movie}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
              <FaStar /> {review.rating}
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-700 transition-colors">
              {review.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {review.excerpt}
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500 font-medium">
                By {review.author}
              </span>
              <button className="text-xs text-red-600 font-semibold hover:underline">
                Read Review
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
