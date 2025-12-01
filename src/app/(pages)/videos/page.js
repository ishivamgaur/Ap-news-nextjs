"use client";

import { useState, useRef, useCallback } from "react";
import { useGetVideosArticlesQuery } from "@/store/api/articleApi";
import VideoCard from "@/components/VideoCard";
import VideoModal from "@/components/VideoModal";
import VideoCardSkeleton from "@/components/VideoCardSkeleton";
import { useLanguage } from "@/context/LanguageContext";
import { FaPlay, FaFilm } from "react-icons/fa";

const VideosPage = () => {
  const { language } = useLanguage();
  const [page, setPage] = useState(1);
  const [playingVideo, setPlayingVideo] = useState(null);
  const observer = useRef();

  const { data, isLoading, isFetching } = useGetVideosArticlesQuery(page);

  const videos = data?.articles || [];
  const total = data?.total || 0;
  const hasMore = videos.length < total;

  const handlePlayVideo = (videoId, articleId, category) =>
    setPlayingVideo({ videoId, articleId, category });
  const handleCloseModal = () => setPlayingVideo(null);

  const lastVideoElementRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );

  const transformVideoItem = (item) => ({
    id: item._id,
    title: item.title,
    category: item.category,
    youtubeVideoId: item.youtubeVideoId?.includes("v=")
      ? item.youtubeVideoId.split("v=")[1]?.split("&")[0]
      : item.youtubeVideoId?.includes("youtu.be/")
      ? item.youtubeVideoId.split("youtu.be/")[1]?.split("?")[0]
      : item.youtubeVideoId,
  });

  const transformedVideos = videos.map(transformVideoItem);
  const featuredVideo = transformedVideos[0];
  const remainingVideos = transformedVideos.slice(1);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-red-700 pl-4 flex items-center gap-2">
              {language === "hi" ? "प्रमुख वीडियो" : "Featured Video"}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              {language === "hi"
                ? "नवीनतम समाचार और विशेष रिपोर्ट देखें"
                : "Watch the latest news and special reports"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Video Section */}
        {featuredVideo && !isLoading && (
          <div className="mb-12">
            <div
              className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              onClick={() =>
                handlePlayVideo(
                  featuredVideo.youtubeVideoId,
                  featuredVideo.id,
                  featuredVideo.category
                )
              }
            >
              <img
                src={`https://i3.ytimg.com/vi/${featuredVideo.youtubeVideoId}/maxresdefault.jpg`}
                alt={featuredVideo.title[language]}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                  <FaPlay className="text-white text-2xl ml-1" />
                </div>
                <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">
                  {featuredVideo.category}
                </span>
                <h3 className="text-white text-xl md:text-3xl font-bold font-serif leading-tight drop-shadow-lg max-w-4xl">
                  {featuredVideo.title[language]}
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-red-700 pl-4 mb-6 flex items-center gap-2">
            {language === "hi" ? "नवीनतम वीडियो" : "Latest Videos"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {remainingVideos.map((video, index) => {
              if (remainingVideos.length === index + 1) {
                return (
                  <div ref={lastVideoElementRef} key={video.id}>
                    <VideoCard
                      video={video}
                      onPlay={(videoId) =>
                        handlePlayVideo(videoId, video.id, video.category)
                      }
                    />
                  </div>
                );
              } else {
                return (
                  <div key={video.id}>
                    <VideoCard
                      video={video}
                      onPlay={(videoId) =>
                        handlePlayVideo(videoId, video.id, video.category)
                      }
                    />
                  </div>
                );
              }
            })}

            {(isLoading || isFetching) && (
              <>
                {[...Array(8)].map((_, i) => (
                  <VideoCardSkeleton key={i} />
                ))}
              </>
            )}
          </div>
        </div>

        {!hasMore && videos.length > 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FaFilm className="text-gray-400 text-2xl" />
            </div>
            <p className="text-gray-500 font-medium">
              {language === "hi"
                ? "आपने सभी वीडियो देख लिए हैं"
                : "You've reached the end of the list"}
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

export default VideosPage;
