// src/components/SidebarScoreWidget.jsx
import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import AdComponent from "./AdComponent";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { useGetTrendingArticlesQuery } from "../store/api/articleApi";

const SidebarScoreWidget = () => {
  const { language } = useLanguage();
  const { data: trendingArticles, isLoading } = useGetTrendingArticlesQuery();

  // --- Countdown Logic ---
  const electionDate = new Date("2025-11-14T00:00:00");

  const calculateTimeLeft = () => {
    const difference = +electionDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        sec: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <aside className="hidden xl:flex flex-col sticky top-20 lg:w-52 xl:w-64 p-2 bg-white rounded-xl border border-gray-100 shadow-sm h-[calc(100vh-6rem)]">
      <div className="shrink-0 mb-6">
        <div className="p-5 border border-red-100 rounded-xl bg-red-50/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-red-100 rounded-full blur-xl opacity-50"></div>

          <div className="flex mb-4 justify-between items-center">
            <h3 className="font-serif font-bold text-red-800 text-base lg:text-xs xl:text-lg">
              {language === "hi" ? "चुनाव 2025" : "Election 2025"}
            </h3>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
          </div>

          {Object.keys(timeLeft).length > 0 ? (
            <div className="grid grid-cols-4 gap-2 text-center">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div
                  key={unit}
                  className="bg-white p-2 rounded-lg shadow-sm border border-red-100 flex flex-col items-center justify-center"
                >
                  <div className="text-xl lg:text-sm xl:text-xl font-bold text-red-700 font-mono leading-none mb-1">
                    {value}
                  </div>
                  <div className="text-[10px] lg:text-[8px] xl:text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                    {language === "hi"
                      ? {
                          days: "दिन",
                          hours: "घंटे",
                          min: "मिनट",
                          sec: "सेकंड",
                        }[unit]
                      : unit}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Link
              href={"/election-results"}
              className="text-lg lg:text-sm xl:text-lg text-center block hover:underline text-red-700 font-bold bg-white py-2 rounded-lg shadow-sm border border-red-100"
            >
              {language === "hi" ? "चुनाव परिणाम देखें" : "View Results"}
            </Link>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="grow overflow-y-auto pr-2 space-y-6">
        {/* Trending Articles Section */}
        {isLoading ? (
          <div className="mb-6 animate-pulse">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-gray-200 rounded-full"></div>
              <div className="h-5 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3 items-start p-2">
                  <div className="shrink-0 w-16 h-16 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-gray-200 rounded-md"></div>
                  <div className="grow space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-16 mt-1"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : trendingArticles?.articles?.length > 0 ? (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-red-700 rounded-full"></div>
              <h2 className="text-lg lg:text-sm xl:text-lg font-bold text-gray-900">
                {language === "hi" ? "ट्रेंडिंग न्यूज़" : "Trending Now"}
              </h2>
            </div>

            <div className="space-y-3">
              {trendingArticles.articles.slice(0, 5).map((article) => (
                <Link
                  key={article._id}
                  href={`${
                    article.category.toLowerCase() === "general"
                      ? "news"
                      : `${article.category.toLowerCase()}`
                  }/article/${article._id}`}
                  className="group flex gap-3 items-start p-2 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                >
                  {/* Image */}
                  <div className="shrink-0 w-16 h-16 lg:w-12 lg:h-12 xl:w-10 xl:min-h-[60px] flex items-center rounded-md overflow-hidden">
                    {article.featuredImage ? (
                      <img
                        src={article.featuredImage?.url}
                        alt={article.featuredImage?.alt}
                        className="w-full h-[40px] rounded-md object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        <span className="text-xs">No Img</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="grow min-w-0">
                    <h4 className="text-sm lg:text-xs xl:text-xs font-semibold text-gray-800 line-clamp-4 group-hover:text-red-700 transition-colors leading-snug">
                      {article.title[language] || article.title.en}
                    </h4>

                    {/* <div className="flex items-center gap-2 mt-1.5">
                      <span className="flex items-center gap-1 text-[10px] lg:text-[9px] xl:text-[10px] text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded-full">
                        <FaEye size={10} />{" "}
                        {(article.views || 0).toLocaleString()}
                      </span>
                    </div> */}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {/* Ads Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Sponsored
            </span>
            <div className="h-px bg-gray-200 grow"></div>
          </div>
          <AdComponent
            adImage="https://api.microlink.io/?url=https://www.amazon.in&screenshot=true&embed=screenshot.url"
            title="Amazon"
            adLink="https://www.amazon.in/"
          />
          <AdComponent
            adImage="https://api.microlink.io/?url=https://www.makemytrip.com/&screenshot=true&embed=screenshot.url"
            title="MakeMyTrip"
            adLink="https://www.makemytrip.com/"
          />
          <AdComponent
            adImage="https://api.microlink.io/?url=https://www.zomato.com/ncr&screenshot=true&embed=screenshot.url"
            title="Zomato"
            adLink="https://www.zomato.com/"
          />
          <AdComponent
            adImage="https://api.microlink.io/?url=https://www.nykaa.com/&screenshot=true&embed=screenshot.url"
            title="Nykaa"
            adLink="https://www.nykaa.com/"
          />
        </div>
      </div>
    </aside>
  );
};

export default SidebarScoreWidget;
