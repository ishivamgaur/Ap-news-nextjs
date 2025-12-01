"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaTimes, FaSpinner } from "react-icons/fa";
import { useLazySearchArticlesQuery } from "../store/api/searchApi";
import Link from "next/link";

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [triggerSearch, { data, isFetching }] = useLazySearchArticlesQuery();
  const router = useRouter();
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  // Load recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const addToRecentSearches = (term) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter((t) => t !== term)].slice(
      0,
      5
    );
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim().length >= 3) {
      triggerSearch({ q: debouncedQuery, limit: 5 });
    }
  }, [debouncedQuery, triggerSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      addToRecentSearches(query);
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-20 px-4">
      {/* Dimmed Background */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative w-full lg:max-w-xl 2xl:max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Search Header */}
        <form
          onSubmit={handleSearch}
          className="flex items-center border-b border-gray-100 p-4 lg:p-3"
        >
          <FaSearch className="text-gray-400 ml-2" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for news, topics, or categories..."
            className="flex-1 ml-4 text-lg lg:text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 p-2 text-gray-500 hover:text-red-600 font-medium text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ESC
          </button>
        </form>

        {/* Suggestions / Results */}
        <div className="max-h-[60vh] overflow-y-auto bg-gray-50/50">
          {!query.trim() ? (
            <div className="p-4 space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2 px-2">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Recent Searches
                    </h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm lg:text-xs text-gray-600 hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <FaSearch className="text-gray-300 text-xs" />
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Categories */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                  Popular Categories
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    "Elections",
                    "Bhojpuri",
                    "Sports",
                    "technology",
                    "business",
                  ].map((category) => (
                    <Link
                      key={category}
                      href={`/${category.toLowerCase()}`}
                      onClick={onClose}
                      className="px-4 py-3 lg:px-3 lg:py-2 bg-white border border-gray-100 rounded-xl text-sm lg:text-xs font-medium text-gray-700 hover:border-red-200 hover:text-red-600 hover:shadow-sm transition-all text-center"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : isFetching ? (
            <div className="flex items-center justify-center p-8 text-gray-500">
              <FaSpinner className="animate-spin mr-2" /> Searching...
            </div>
          ) : query.trim().length > 0 && query.length < 3 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              Type at least 3 characters to search
            </div>
          ) : data?.articles?.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Suggestions
              </div>
              {data.articles.map((article) => (
                <Link
                  key={article._id}
                  href={`/news/article/${article._id}`}
                  onClick={() => {
                    addToRecentSearches(query);
                    onClose();
                  }}
                  className="flex items-start gap-4 px-4 py-3 lg:px-3 lg:py-2 hover:bg-white hover:shadow-sm transition-all group border-b border-gray-100 last:border-0"
                >
                  <img
                    src={article.featuredImage?.url || "/Ap-news.png"}
                    alt={article.title.en}
                    className="w-16 h-12 object-cover rounded-md group-hover:scale-105 transition-transform"
                    onError={(e) => (e.target.src = "/Ap-news.png")}
                  />
                  <div>
                    <h4 className="text-sm lg:text-xs font-medium text-gray-800 group-hover:text-red-700 line-clamp-2 leading-snug">
                      {article.title.en}
                    </h4>
                    <span className="text-xs text-gray-500 mt-1 inline-block">
                      {article.category}
                    </span>
                  </div>
                </Link>
              ))}
              <button
                onClick={handleSearch}
                className="w-full py-3 text-center text-red-600 font-medium text-sm lg:text-xs hover:bg-red-50 transition-colors border-t border-gray-100"
              >
                View all results for "{query}"
              </button>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
