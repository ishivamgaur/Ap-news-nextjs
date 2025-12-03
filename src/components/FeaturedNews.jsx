import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { FaEye } from "react-icons/fa";

const FeaturedNews = ({ news, onPlay }) => {
  const { language } = useLanguage();

  // Ensure news is an array. If it's a single object (legacy), wrap it.
  // If it's undefined/null, use empty array.
  const newsList = Array.isArray(news) ? news : news ? [news] : [];

  if (newsList.length === 0) return null;

  const mainStory = newsList[0];
  const subStories = newsList.slice(1, 3); // Take next 2 stories

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Story - Takes up 2 columns on large screens */}
      <div className="lg:col-span-2 relative h-[400px] lg:h-[500px] overflow-hidden rounded-3xl shadow-2xl group cursor-pointer">
        <div className="absolute inset-0">
          <img
            src={mainStory.image}
            alt={mainStory.title[language]}
            className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${
              mainStory.youtubeVideoId ? "brightness-75" : ""
            }`}
          />
          {mainStory.youtubeVideoId && (
            <div
              className="absolute top-4 right-4 bg-red-600 text-white p-2.5 rounded-full shadow-lg z-20 hover:bg-red-700 transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPlay(mainStory.youtubeVideoId);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          {mainStory.views > 0 && (
            <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1 z-20">
              <FaEye className="w-3 h-3" /> {mainStory.views}
            </span>
          )}
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 lg:p-8 text-white">
            <span className="bg-red-600 px-2.5 py-0.5 text-[9px] md:text-[9px] lg:text-[10px] font-bold uppercase tracking-wider rounded-full mb-3 inline-block shadow-sm">
              {mainStory.category
                .split(" ")
                .map(
                  (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
                )
                .join(" ")}
            </span>
            <h2 className="text-xl md:text-xl lg:text-2xl 2xl:text-3xl font-serif font-bold mb-3 leading-tight drop-shadow-lg">
              <Link
                href={
                  mainStory.category == "General"
                    ? `/news/article/${mainStory.id}`
                    : `/${mainStory.category.toLowerCase()}/article/${
                        mainStory.id
                      }`
                }
                className="hover:underline decoration-red-500 decoration-2 underline-offset-4"
              >
                {mainStory.title[language]}
              </Link>
            </h2>
            <p className="text-gray-200 mb-4 line-clamp-2 font-medium text-xs md:text-xs lg:text-sm 2xl:text-base lg:w-4/5 opacity-90">
              {mainStory.description[language]}
            </p>
          </div>
        </div>
      </div>

      {/* Sub Stories - Stacked on the right */}
      <div className="flex flex-col gap-6 h-full">
        {subStories.map((story, index) => (
          <div
            key={story.id}
            className="relative flex-1 min-h-[200px] overflow-hidden rounded-3xl shadow-xl group"
          >
            <img
              src={story.image}
              alt={story.title[language]}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                story.youtubeVideoId ? "brightness-75" : ""
              }`}
            />
            {story.youtubeVideoId && (
              <div
                className="absolute top-3 right-3 bg-red-600/90 text-white p-1.5 rounded-full shadow-md z-20 hover:bg-red-700 transition-colors backdrop-blur-sm cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onPlay(story.youtubeVideoId);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            {story.views > 0 && (
              <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1 z-20">
                <FaEye className="w-2.5 h-2.5" /> {story.views}
              </span>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 text-[8px] md:text-[8px] lg:text-[8px] 2xl:text-[10px] font-bold uppercase tracking-wider rounded-full mb-1.5 inline-block border border-white/30">
                  {story.category}
                </span>
                <h3 className="text-base md:text-base lg:text-md 2xl:text-lg font-serif font-bold leading-snug drop-shadow-md">
                  <Link
                    href={
                      story.category == "General"
                        ? `/news/article/${story.id}`
                        : `/${story.category.toLowerCase()}/article/${story.id}`
                    }
                    className="hover:text-red-400 transition-colors"
                  >
                    {story.title[language]}
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        ))}
        {/* Fallback if not enough stories */}
        {subStories.length === 0 && (
          <div className="flex-1 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-400 font-medium border-2 border-dashed border-gray-200">
            More news coming soon...
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedNews;
