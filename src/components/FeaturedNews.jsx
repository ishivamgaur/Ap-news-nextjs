import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

const FeaturedNews = ({ news }) => {
  const { language } = useLanguage();

  // Ensure news is an array. If it's a single object (legacy), wrap it.
  // If it's undefined/null, use empty array.
  const newsList = Array.isArray(news) ? news : news ? [news] : [];

  if (newsList.length === 0) return null;

  const mainStory = newsList[0];
  const subStories = newsList.slice(1, 3); // Take next 2 stories

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:aspect-2/1">
      {/* Main Story - Takes up 2 columns on large screens */}
      <div className="lg:col-span-2 relative h-96 lg:h-auto overflow-hidden rounded-2xl shadow-xl group">
        <img
          src={mainStory.image}
          alt={mainStory.title[language]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
            <span className="bg-red-700 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-3 inline-block">
              {mainStory.category
                .split(" ")
                .map(
                  (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
                )
                .join(" ")}
            </span>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-3 leading-tight drop-shadow-md">
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
            <p className="text-gray-200 mb-6 line-clamp-2 font-medium text-lg lg:w-4/5">
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
            className="relative flex-1 min-h-[200px] overflow-hidden rounded-2xl shadow-lg group"
          >
            <img
              src={story.image}
              alt={story.title[language]}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded mb-2 inline-block border border-white/30">
                  {story.category}
                </span>
                <h3 className="text-lg font-serif font-bold leading-snug drop-shadow-sm">
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
          <div className="flex-1 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 font-medium">
            More news coming soon...
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedNews;
