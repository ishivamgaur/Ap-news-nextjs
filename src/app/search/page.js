"use client";
import { useSearchParams } from "next/navigation";
import { useSearchArticlesQuery } from "../../store/api/searchApi";
import { FaSpinner } from "react-icons/fa";
import { useState, useEffect, useRef, useCallback } from "react";
import NewsCard from "../../components/NewsCard";
import NewsCardSkeleton from "../../components/NewsCardSkeleton";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching } = useSearchArticlesQuery(
    { q: query, page, limit: 10 },
    { skip: !query }
  );

  // Reset state when query changes
  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  // Append new articles when data changes
  useEffect(() => {
    if (data?.articles) {
      if (page === 1) {
        setArticles(data.articles);
      } else {
        setArticles((prev) => {
          const newArticles = data.articles.filter(
            (newArt) => !prev.some((prevArt) => prevArt._id === newArt._id)
          );
          return [...prev, ...newArticles];
        });
      }

      // Check if we have loaded all available articles
      if (
        data.total &&
        (page * 10 >= data.total || data.articles.length < 10)
      ) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [data, page]);

  const observer = useRef();
  const lastNewsElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isFetching) {
            setPage((prev) => prev + 1);
          }
        },
        { rootMargin: "500px" } // Load more before reaching the bottom
      );
      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );

  if (!query) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-500">Please enter a search term.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-16">
          Total {data?.total || 0} Search Results for{" "}
          <span className="text-red-700">"{query}"</span>
        </h1>

        {/* Initial Loading State - Shimmer Effect */}
        {isFetching && page === 1 && articles.length === 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(10)].map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        ) : articles.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {articles.map((article, i) => (
                <div
                  key={article._id}
                  ref={i === articles.length - 1 ? lastNewsElementRef : null}
                >
                  <NewsCard
                    news={{
                      id: article._id,
                      title: article.title,
                      description: article.summary,
                      image: article.featuredImage?.url,
                      date: article.publishAt,
                      category: article.category,
                      youtubeVideoId: article.youtubeVideoId,
                    }}
                  />
                </div>
              ))}
              {isFetching && hasMore && (
                <>
                  {[...Array(10)].map((_, i) => (
                    <NewsCardSkeleton key={`loading-more-${i}`} />
                  ))}
                </>
              )}
            </div>
          </>
        ) : (
          !isFetching && (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <img
                src="/no-results.svg"
                alt="No results"
                className="w-48 h-48 mx-auto mb-4 opacity-50"
                onError={(e) => (e.target.style.display = "none")}
              />
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-500">
                We couldn't find any articles matching "{query}". Try different
                keywords.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchPage;
