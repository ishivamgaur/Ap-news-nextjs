"use client";

import { useLanguage } from "@/context/LanguageContext";
import ShareButtons from "@/components/ShareButtons";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import VideoModal from "@/components/VideoModal";
import { useState } from "react";

const ArticleContent = ({ article }) => {
  const { language } = useLanguage();
  const [playingVideoId, setPlayingVideoId] = useState(null);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Article Not Found
        </h1>
        <Link
          href="/"
          className="px-6 py-2 bg-red-700 text-white rounded-full hover:bg-red-800 transition-colors"
        >
          Go Home
        </Link>
      </div>
    );
  }

  // Helper to safely get content based on language
  const getLocalizedContent = (field) => {
    if (!article[field]) return "";
    return article[field][language] || article[field]["en"] || "";
  };

  const title = getLocalizedContent("title");
  const description = getLocalizedContent("description");
  const content = getLocalizedContent("content"); // Assuming content is HTML or rich text
  const category = article.category || "General";
  const date = new Date(
    article.publishAt || article.createdAt
  ).toLocaleDateString(language === "hi" ? "hi-IN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-6 lg:pt-6 xl:pt-8 2xl:pt-10 pb-12 lg:pb-12 xl:pb-16 2xl:pb-20">
      <div className="max-w-5xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-4">
        {/* Article Header */}
        <header className="mb-6 lg:mb-6 xl:mb-8 2xl:mb-10">
          <span className="inline-block bg-red-50 text-red-700 px-2.5 py-0.5 text-[10px] lg:text-[10px] xl:text-xs font-bold uppercase tracking-wider rounded-full mb-3 lg:mb-3 xl:mb-4 border border-red-100">
            {category}
          </span>
          <h1 className="text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-bold text-gray-900 leading-tight mb-4 lg:mb-4 xl:mb-6 font-serif">
            {title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-6 text-gray-600 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <FaUser size={14} />
                </div>
                <span>AP News Desk</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400" />
                <span>{date}</span>
              </div>
            </div>
            <ShareButtons
              title={title}
              url={`/${category.toLowerCase()}/article/${
                article._id || article.id
              }`}
            />
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-sm bg-gray-100 group">
          <Image
            src={article.featuredImage?.url || "/Ap-news.png"}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          {article.youtubeVideoId && (
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <button
                onClick={() => setPlayingVideoId(article.youtubeVideoId)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold flex items-center gap-3 shadow-lg transform transition-all hover:scale-105 backdrop-blur-sm"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-red-600 ml-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {language === "hi" ? "वीडियो देखें" : "Watch Video"}
              </button>
            </div>
          )}
        </div>

        {/* Summary / Description */}
        {description && (
          <div className="mb-6 lg:mb-6 xl:mb-8 2xl:mb-10 p-5 lg:p-5 xl:p-6 bg-gray-50 rounded-xl border-l-4 border-red-700">
            <p className="text-base md:text-lg lg:text-lg xl:text-xl text-gray-700 italic leading-relaxed font-serif">
              {description}
            </p>
          </div>
        )}

        {/* Main Content */}
        <article className="prose prose-base md:prose-lg lg:prose-lg xl:prose-xl max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-red-700 hover:prose-a:text-red-800 prose-img:rounded-xl prose-strong:text-gray-900">
          <div dangerouslySetInnerHTML={{ __html: content || "" }} />
        </article>

        {/* Footer Share */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
          <span className="font-bold text-gray-900">Share this article:</span>
          <ShareButtons
            title={title}
            url={`/${category}/article/${article._id || article.id}`}
          />
        </div>
      </div>
      <VideoModal
        videoId={playingVideoId}
        onClose={() => setPlayingVideoId(null)}
      />
    </div>
  );
};

export default ArticleContent;
