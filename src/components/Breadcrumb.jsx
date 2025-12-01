"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { categories } from "../data/categories"; // Import categories data

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);
  const { language, toggleLanguage } = useLanguage();

  const translations = {
    en: { home: "Home", article: "Article" },
    hi: { home: "होम", article: "लेख" },
  };

  // Don't render breadcrumbs on the home page
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-3 lg:py-4">
      <div className="max-w-6xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 xl:px-4">
        <nav
          aria-label="Breadcrumb"
          className="flex justify-start items-start"
        >
          <ol className="flex items-center flex-wrap justify-start gap-2 bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100">
            <li>
              <Link
                href="/"
                className="flex items-center text-gray-400 hover:text-red-700 transition-colors duration-300"
                title={translations[language].home}
              >
                <FaHome className="w-3.5 h-3.5" />
              </Link>
            </li>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;

              const isArticleSegment = name.toLowerCase() === "article";

              let displayName;
              let categoryMatch = null;

              if (isArticleSegment) {
                displayName = translations[language].article;
              } else {
                // Try to find a matching category title
                categoryMatch = categories.find(
                  (cat) => cat.path.substring(1) === name.toLowerCase()
                );
                displayName = categoryMatch
                  ? categoryMatch.title[language]
                  : name.charAt(0).toUpperCase() +
                    name.slice(1).replace(/-/g, " ");
              }

              // Determine if we should truncate (only for IDs, not categories)
              const shouldTruncate = !categoryMatch && !isArticleSegment;

              const truncatedName =
                shouldTruncate && displayName.length > 15
                  ? displayName.slice(0, 15) + "..."
                  : displayName;

              return (
                <li key={name} className="flex items-center">
                  <FaChevronRight className="w-2.5 h-2.5 text-gray-300 mx-2" />
                  {isLast || isArticleSegment ? (
                    <span className="text-[10px] md:text-[11px] font-bold text-red-700 uppercase tracking-widest">
                      {displayName}
                    </span>
                  ) : (
                    <Link
                      href={routeTo}
                      className="text-[10px] md:text-[11px] font-bold text-gray-500 hover:text-red-700 transition-colors duration-300 uppercase tracking-widest"
                    >
                      {truncatedName}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
