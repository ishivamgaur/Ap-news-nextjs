import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import ShareButtons from "./ShareButtons";
import { FaEye } from "react-icons/fa";
const VIEWS_KEY = "apnews_views";

const NewsCard = ({ news, onPlay }) => {
  const { language } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const recordView = () => {
    try {
      const raw = localStorage.getItem(VIEWS_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      parsed[news.id] = (parsed[news.id] || 0) + 1;
      localStorage.setItem(VIEWS_KEY, JSON.stringify(parsed));
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="overflow-hidden hover:shadow-sm transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full">
      <div className="relative h-48 sm:h-52 overflow-hidden shrink-0">
        <Link
          href={
            news.category == "General"
              ? `/news/article/${news.id}`
              : `/${news.category.toLowerCase()}/article/${news.id}`
          }
          className="block w-full h-full"
        >
          <img
            src={news.image || "/Ap-news.png"}
            alt={news.title[language]}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
              news.youtubeVideoId ? "brightness-50" : ""
            }`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/Ap-news.png";
            }}
          />
        </Link>
        {news.youtubeVideoId && (
          <div className="absolute inset-0 flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300 pointer-events-none">
            <div
              className="bg-red-600/90 text-white p-3 rounded-full shadow-lg backdrop-blur-sm cursor-pointer pointer-events-auto hover:bg-red-700 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onPlay) onPlay(news.youtubeVideoId);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        )}
        <span className="absolute top-3 left-3 bg-linear-to-r from-red-600 to-red-700 text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full shadow-md z-10">
          {news.category
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ")}
        </span>
        {news.views > 0 && (
          <span className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1 z-10">
            <FaEye className="w-2.5 h-2.5" /> {news.views}
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col grow">
        <h3 className="font-bold text-sm md:text-[14px] lg:text-xs xl:text-sm mb-2 line-clamp-2 text-gray-900 group-hover:text-red-700 transition-colors leading-tight font-serif">
          <Link
            href={
              news.category == "General"
                ? `/news/article/${news.id}`
                : `/${news.category.toLowerCase()}/article/${news.id}`
            }
          >
            {news.title[language]}
          </Link>
        </h3>
        <div className="grow">
          <p className="text-gray-500 text-xs md:text-xs lg:text-xs xl:text-xs font-medium line-clamp-3 mb-4 leading-relaxed">
            {news.description[language]}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[10px] md:text-[10px] lg:text-xs text-gray-400 font-medium">
            {isClient &&
              new Date(news.date).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
          </span>
          <div className="flex items-center space-x-2">
            <Link
              href={
                news.category == "General"
                  ? `/news/article/${news.id}`
                  : `/${news.category.toLowerCase()}/article/${news.id}`
              }
              onClick={recordView}
              className="text-red-700 hover:text-red-800 text-[10px] md:text-[10px] lg:text-xs font-bold transition-colors uppercase tracking-wide"
            >
              {language === "hi" ? "और पढ़ें" : "Read More"}
            </Link>
            {/* <ShareButtons
              title={news.title[language]}
              url={
                news.category == "General"
                  ? `/news/article/${news.id}`
                  : `/${news.category.toLowerCase()}/article/${news.id}`
              }
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
