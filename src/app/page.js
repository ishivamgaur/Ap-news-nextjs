"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { useGetAllNewsArticlesQuery } from "@/store/api/articleApi"; // adjust path
import FeaturedNews from "../components/FeaturedNews";
import NewsCard from "../components/NewsCard";
import VideoCard from "../components/VideoCard";
import VideoModal from "../components/VideoModal";
import Sidebar from "../components/SidebarScoreWidget";
import RightSidebarNews from "@/components/RSidebarLatestNews";
import FloatingVideoPlayer from "@/components/FloatingVideoPlayer";
import Pagination from "../components/Pagination";
import FeaturedNewsSkeleton from "../components/FeaturedNewsSkeleton";
import VideoCardSkeleton from "../components/VideoCardSkeleton";
import NewsCardSkeleton from "../components/NewsCardSkeleton";
import { useLanguage } from "../context/LanguageContext";

const Home = () => {
  const { language } = useLanguage();
  const [page, setPage] = useState(1);
  const observer = useRef();
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const { data, isLoading, isFetching } = useGetAllNewsArticlesQuery(page);
  console.log("Data", data);

  const allNews = data?.items || [];
  const pagination = data?.pagination;
  const hasMore = pagination?.hasNextPage || allNews.length === 10;

  const transformNewsItem = (item) => ({
    id: item._id,
    title: item.title,
    description: item.summary,
    fullDescription: item.content,
    image: item.featuredImage?.url,
    category: item.category,
    date: item.publishAt,
    youtubeVideoId: item.youtubeVideoId,
  });

  const transformedNews = allNews.map(transformNewsItem);

  // Observe last news card
  const lastNewsElementRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );

  const featuredNews = transformedNews[0];
  const otherNews = transformedNews.slice(1);
  const videoNews = transformedNews.filter((item) => item.youtubeVideoId);
  const [videoPage, setVideoPage] = useState(1);
  const videosPerPage = 4;

  const totalVideoPages = Math.ceil(videoNews.length / videosPerPage);
  const currentVideos = useMemo(() => {
    const start = (videoPage - 1) * videosPerPage;
    return videoNews.slice(start, start + videosPerPage);
  }, [videoPage, videoNews]);

  const handlePlayVideo = (id) => setPlayingVideoId(id);
  const handleCloseModal = () => setPlayingVideoId(null);

  // Skeleton state
  if (isLoading && page === 1) {
    return (
      <div className="lg:flex">
        <Sidebar />
        <main className="flex-1 min-h-[60vh]">
          <div className="container mx-auto px-4">
            <div className="bg-gray-50 min-h-screen py-4">
              <div className="mb-12">
                <FeaturedNewsSkeleton />
              </div>
              <div className="mb-12">
                <div className="h-9 bg-gray-300 rounded w-64 border-l-4 border-gray-300 pl-4 mb-6 animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <VideoCardSkeleton key={i} />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <NewsCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </main>
        <RightSidebarNews />
      </div>
    );
  }

  return (
    <>
      <div className="lg:flex">
        <Sidebar />
        <main className="flex-1 min-h-[60vh]">
          <div className="container mx-auto px-4 bg-gray-50 min-h-screen py-4">
            {/* Featured */}
            <div className="mb-12">
              <FeaturedNews news={featuredNews} />
            </div>

            {/* Videos */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-red-700 pl-4 mb-6">
                {language === "hi" ? "वीडियो समाचार" : "Video News"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentVideos.map((v) => (
                  <VideoCard key={v.id} video={v} onPlay={handlePlayVideo} />
                ))}
              </div>
              <Pagination
                currentPage={videoPage}
                totalPages={totalVideoPages}
                onPageChange={setVideoPage}
              />
            </div>

            {/* Latest News */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-red-700 pl-4 mb-6">
                {language === "hi" ? "ताज़ा खबरें" : "Latest News"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherNews.map((news, i) => (
                  <div
                    key={news.id}
                    ref={i === otherNews.length - 1 ? lastNewsElementRef : null}
                  >
                    <NewsCard news={news} />
                  </div>
                ))}

                {isFetching && (
                  <>
                    {[...Array(10)].map((_, i) => (
                      <NewsCardSkeleton key={i} />
                    ))}
                  </>
                )}
              </div>

              {!hasMore && transformedNews.length > 1 && (
                <div className="text-center py-4">No more news to load.</div>
              )}
            </div>
          </div>
        </main>
        <RightSidebarNews />
      </div>

      <FloatingVideoPlayer />
      <VideoModal videoId={playingVideoId} onClose={handleCloseModal} />
    </>
  );
};

export default Home;
