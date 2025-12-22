"use client";
import { useState, useCallback, useRef } from "react";
import NewsCard from "@/components/NewsCard";
import NewsCardSkeleton from "@/components/NewsCardSkeleton";
import VideoModal from "@/components/VideoModal";
import { useGetSportsArticlesQuery } from "@/store/api/articleApi";
import { useLanguage } from "@/context/LanguageContext";

const SportsPage = () => {
  const { language } = useLanguage();
  const [page, setPage] = useState(1);
  const [playingVideo, setPlayingVideo] = useState(null);
  const observer = useRef();
  const transformNewsItem = (item) => ({
    id: item._id,
    title: item.title,
    description: item.summary,
    fullDescription: item.content,
    image: item.featuredImage?.url,
    category: item.category,
    date: item.publishAt,
    youtubeVideoId: item.youtubeVideoId,
    views: item.views,
  });

  const { data, isLoading, isFetching, isError } =
    useGetSportsArticlesQuery(page);

  const articles = (data?.articles || []).map(transformNewsItem);
  const hasMore = data ? articles.length < data.total : false;

  const lastNewsElementRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prev) => prev + 1);
          }
        },
        { rootMargin: "500px" }
      );
      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );

  const handlePlayVideo = (videoId, articleId, category) => {
    setPlayingVideo({ videoId, articleId, category });
  };
  const handleCloseModal = () => setPlayingVideo(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {isLoading && page === 1 ? (
          <>
            <div className="mb-6 animate-pulse">
              <div className="h-10 bg-gray-300 rounded w-48 border-l-4 border-gray-300 pl-4"></div>
              <div className="h-4 bg-gray-300 rounded w-72 mt-4 ml-4"></div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(9)].map((_, index) => (
                <NewsCardSkeleton key={index} />
              ))}
            </div>
          </>
        ) : articles.length > 0 ? (
          !isError ? (
            <>
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-800 border-l-4 border-red-700 pl-4">
                  Sports
                </h1>
                <p className="text-gray-600 mt-2 pl-4">
                  Scores, matches, and sports news
                </p>
              </div>

              <div className="mb-8 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-red-50 to-white">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <h2 className="font-bold text-gray-800 text-lg">
                      {language === "hi"
                        ? "लाइव क्रिकेट स्कोर"
                        : "Live Cricket Scores"}
                    </h2>
                  </div>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100 tracking-wide">
                    LIVE
                  </span>
                </div>
                <div className="h-[500px] w-full bg-gray-50 relative">
                  <iframe
                    src="https://cwidget.crictimes.org/?v=1.1&a=de0c0c"
                    title={
                      language === "hi"
                        ? "लाइव क्रिकेट स्कोर"
                        : "Live Cricket Scores"
                    }
                    className="w-full h-full"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {articles.map((news, i) => (
                  <div
                    key={news.id}
                    ref={i === articles.length - 1 ? lastNewsElementRef : null}
                  >
                    <NewsCard
                      news={news}
                      onPlay={(videoId) =>
                        handlePlayVideo(videoId, news.id, news.category)
                      }
                    />
                  </div>
                ))}
                {isFetching &&
                  [...Array(3)].map((_, index) => (
                    <NewsCardSkeleton key={`skeleton-${index}`} />
                  ))}
              </div>
            </>
          ) : null
        ) : (
          <div className="text-center col-span-full py-16">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Articles Found
            </h2>
            <p className="text-gray-500 mt-2">
              There are currently no news articles available in this category.
              Please check back later.
            </p>
          </div>
        )}
      </div>
      <VideoModal
        videoId={playingVideo?.videoId}
        articleId={playingVideo?.articleId}
        category={playingVideo?.category}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SportsPage;
