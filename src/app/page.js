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

const Home = () => {
  const { language } = useLanguage();
  const dispatch = useDispatch();
  const homeFeedPage = useSelector((state) => state.ui.homeFeedPage);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const observer = useRef();

  // We use a local state to track if we are initializing to avoid double fetch if needed,
  // but RTK Query handles caching.
  // The query hook needs the *current* page to fetch.
  // If we want to load *up to* page N, we might need a different approach or just rely on the fact
  // that we want to fetch page N when we scroll.
  // Actually, standard infinite scroll with RTK Query usually involves fetching page 1, then 2, etc.
  // If we come back and `homeFeedPage` is 5, we might miss pages 1-4 if we just fetch 5.
  // BUT, `getAllNewsArticles` cache is keyed by the endpoint name (shared cache).
  // So if the cache exists in the store, `useGetAllNewsArticlesQuery(page)` might just return the cached data
  // for that specific page arg?
  // Wait, `serializeQueryArgs: ({ endpointName }) => endpointName` means all pages share the SAME cache entry.
  // So `useGetAllNewsArticlesQuery(1)` and `useGetAllNewsArticlesQuery(5)` write to the SAME cache.
  // So if we just call `useGetAllNewsArticlesQuery(homeFeedPage)`, it will trigger a fetch for `homeFeedPage`.
  // If `homeFeedPage` is 5, it fetches page 5 and merges it.
  // If the cache was preserved (which it is, in Redux), then we already have 1..4.
  // So we just need to start from `homeFeedPage`.

  const { data, isLoading, isFetching } =
    useGetAllNewsArticlesQuery(homeFeedPage);

  const { data: videoDAta, isLoading: isVideoLoading } =
    useGetVideosArticlesQuery();

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
    youtubeVideoId: item.youtubeVideoId,
  });

  const transformedNews = allNews.map(transformNewsItem);
  const transformedVideoArticles = allVideosArtciles.map(transformNewsItem);

  // Observe last news card
  const lastNewsElementRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(setHomeFeedPage(homeFeedPage + 1));
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore, homeFeedPage, dispatch]
  );

  const featuredNews = transformedNews.slice(0, 3);
  const otherNews = transformedNews.slice(3);
  const videoNews = transformedVideoArticles;
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <VideoCardSkeleton key={i} />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <div className="lg:flex">
        <Sidebar />
        <main className="flex-1 min-h-[60vh]">
          <div className="w-full max-w-full px-4 bg-gray-50 min-h-screen py-4">
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
                    {[...Array(5)].map((_, i) => (
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
