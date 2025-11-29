import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import ShareButtons from "./ShareButtons";
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full">
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
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/Ap-news.png";
            }}
          />
        </Link>
        {news.youtubeVideoId && (
          <div
            className="absolute top-2 right-2 bg-red-600/90 text-white p-2 rounded-full shadow-md z-20 hover:bg-red-700 transition-colors backdrop-blur-sm cursor-pointer"
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
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        <span className="absolute top-3 left-3 bg-linear-to-r from-red-600 to-red-700 text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full shadow-md">
          {news.category
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ")}
        </span>
      </div>
      <div className="p-5 flex flex-col grow">
        <h3 className="font-bold text-sm md:text-[14px] lg:text-xs xl:text-base mb-2 line-clamp-2 text-gray-900 group-hover:text-red-700 transition-colors leading-tight font-serif">
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
          <p className="text-gray-500 text-xs md:text-xs lg:text-sm xl:text-base font-medium line-clamp-3 mb-4 leading-relaxed">
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
            <ShareButtons
              title={news.title[language]}
              url={
                news.category == "General"
                  ? `/news/article/${news.id}`
                  : `/${news.category.toLowerCase()}/article/${news.id}`
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
