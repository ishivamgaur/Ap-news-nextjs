"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import {
  useGetAllNewsArticlesQuery,
  useGetVideosArticlesQuery,
} from "@/store/api/articleApi"; // adjust path
import { useDispatch, useSelector } from "react-redux";
import { setHomeFeedPage } from "@/store/uiSlice";
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
import Link from "next/link";

const Home = () => {
  const { language } = useLanguage();
  const dispatch = useDispatch();
  const homeFeedPage = useSelector((state) => state.ui.homeFeedPage);
  const [playingVideo, setPlayingVideo] = useState(null);
  const observer = useRef();

  const { data, isLoading, isFetching } =
    useGetAllNewsArticlesQuery(homeFeedPage);

  const { data: videoDAta, isLoading: isVideoLoading } =
    useGetVideosArticlesQuery(1);

  const allNews = data?.items || [];
  const allVideosArtciles = videoDAta?.articles || [];

  const total = data?.total || 0;
  const limit = data?.limit || 10;
  const hasMore = allNews.length < total && total > 0;

  const transformNewsItem = (item) => ({
    id: item._id,
    title: item.title,
    description: item.summary,
    fullDescription: item.content,
    image: item.featuredImage?.url,
    category: item.category,
    date: item.publishAt,
    youtubeVideoId: item.youtubeVideoId?.includes("v=")
      ? item.youtubeVideoId.split("v=")[1]?.split("&")[0]
      : item.youtubeVideoId?.includes("youtu.be/")
      ? item.youtubeVideoId.split("youtu.be/")[1]?.split("?")[0]
      : item.youtubeVideoId,
    views: item.views || 0,
  });

  const transformedNews = allNews.map(transformNewsItem);
  const transformedVideoArticles = allVideosArtciles.map(transformNewsItem);

  // Observe last news card
  const lastNewsElementRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            dispatch(setHomeFeedPage(homeFeedPage + 1));
          }
        },
        { rootMargin: "500px" }
      );
      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore, homeFeedPage, dispatch]
  );

  const featuredNews = transformedNews.slice(0, 3);
  const otherNews = transformedNews.slice(3);
  const videoNews = transformedVideoArticles.slice(0, 3); // Show only 3 videos on home

  const handlePlayVideo = (videoId, articleId, category) =>
    setPlayingVideo({ videoId, articleId, category });
  const handleCloseModal = () => setPlayingVideo(null);

  // Skeleton state
  if ((isLoading || isVideoLoading) && homeFeedPage === 1) {
    return (
      <div className="lg:flex">
        <Sidebar />
        <main className="flex-1 min-h-[60vh]">
          <div className="w-full max-w-full px-4">
            <div className="bg-gray-50 min-h-screen py-4">
              <div className="mb-12">
                <FeaturedNewsSkeleton />
              </div>
              <div className="mb-12">
                <div className="h-9 bg-gray-300 rounded w-64 border-l-4 border-gray-300 pl-4 mb-6 animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <VideoCardSkeleton key={i} />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(5)].map((_, i) => (
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
      <div className="min-h-screen bg-white">
        <div className="max-w-[1920px] mx-auto xl:px-0 lg:px-4 p-2 py-6">
          <div className="lg:flex flex-nowrap gap-4">
            {/* Left Sidebar - Hidden on LG, visible on XL */}
            <div className="hidden xl:block w-64 shrink-0">
              <Sidebar />
            </div>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Featured */}
              <div className="mb-12">
                <FeaturedNews news={featuredNews} onPlay={handlePlayVideo} />
              </div>

              {/* Videos */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-red-700 pl-4">
                    {language === "hi" ? "वीडियो समाचार" : "Video News"}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
                  {videoNews.map((v) => (
                    <VideoCard
                      key={v.id}
                      video={v}
                      onPlay={(videoId) =>
                        handlePlayVideo(videoId, v.id, v.category)
                      }
                    />
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/videos"
                    className="inline-flex items-center gap-2 text-red-700 font-bold hover:text-red-800 transition-colors"
                  >
                    View More Videos
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Latest News */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-red-700 pl-4">
                    {language === "hi" ? "ताज़ा खबरें" : "Latest News"}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
                  {otherNews.map((news, i) => (
                    <div
                      key={news.id}
                      ref={
                        i === otherNews.length - 1 ? lastNewsElementRef : null
                      }
                    >
                      <NewsCard news={news} onPlay={handlePlayVideo} />
                    </div>
                  ))}

                  {isFetching && (
                    <>
                      {[...Array(4)].map((_, i) => (
                        <NewsCardSkeleton key={i} />
                      ))}
                    </>
                  )}
                </div>

                {!hasMore && transformedNews.length > 1 && (
                  <div className="text-center py-8 text-gray-500 font-medium">
                    No more news to load.
                  </div>
                )}
              </div>
            </main>

            {/* Right Sidebar - Hidden on smaller LG, visible on larger LG/XL */}
            <div className="hidden lg:block w-64 shrink-0">
              <RightSidebarNews />
            </div>
          </div>
        </div>
      </div>

      <FloatingVideoPlayer />
      <VideoModal
        videoId={playingVideo?.videoId}
        articleId={playingVideo?.articleId}
        category={playingVideo?.category}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Home;
