import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

const FeaturedNews = ({ news, onPlay }) => {
  const { language } = useLanguage();

  // Ensure news is an array. If it's a single object (legacy), wrap it.
  // If it's undefined/null, use empty array.
  const newsList = Array.isArray(news) ? news : news ? [news] : [];

  if (newsList.length === 0) return null;

  const mainStory = newsList[0];
  const subStories = newsList.slice(1, 3); // Take next 2 stories

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Story - Takes up 2 columns on large screens */}
      <div className="lg:col-span-2 relative h-[500px] lg:h-[600px] overflow-hidden rounded-3xl shadow-2xl group cursor-pointer">
        <div className="absolute inset-0">
          <img
            src={mainStory.image}
            alt={mainStory.title[language]}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {mainStory.youtubeVideoId && (
            <div
              className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg z-20 hover:bg-red-700 transition-colors"
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
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 text-white">
            <span className="bg-red-600 px-3 py-1 text-[10px] md:text-[10px] lg:text-xs font-bold uppercase tracking-wider rounded-full mb-4 inline-block shadow-sm">
              {mainStory.category
                .split(" ")
                .map(
                  (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
                )
                .join(" ")}
            </span>
            <h2 className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-bold mb-4 leading-tight drop-shadow-lg">
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
            <p className="text-gray-200 mb-6 line-clamp-2 font-medium text-sm md:text-sm lg:text-base xl:text-lg lg:w-4/5 opacity-90">
              {mainStory.description[language]}
            </p>
          </div>
        </div>
      </div>

      {/* Sub Stories - Stacked on the right */}
      <div className="flex flex-col gap-8 h-full">
        {subStories.map((story, index) => (
          <div
            key={story.id}
            className="relative flex-1 min-h-[240px] overflow-hidden rounded-3xl shadow-xl group"
          >
            <img
              src={story.image}
              alt={story.title[language]}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {story.youtubeVideoId && (
              <div
                className="absolute top-3 right-3 bg-red-600/90 text-white p-2 rounded-full shadow-md z-20 hover:bg-red-700 transition-colors backdrop-blur-sm"
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
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 text-[9px] md:text-[9px] lg:text-[10px] font-bold uppercase tracking-wider rounded mb-2 inline-block border border-white/30">
                  {story.category}
                </span>
                <h3 className="text-lg md:text-lg lg:text-xl font-serif font-bold leading-snug drop-shadow-md">
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
