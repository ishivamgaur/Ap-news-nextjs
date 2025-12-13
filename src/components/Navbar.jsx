"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaUserPlus,
  FaChevronDown,
  FaChevronUp,
  FaBell,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { navLinks } from "../components/Navlink";
import { useLanguage } from "../context/LanguageContext";
import SearchModal from "./SearchModal";
import JoinTeamPopup from "./JoinTeamPopup";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isJoinPopupOpen, setIsJoinPopupOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const [expandedCategories, setExpandedCategories] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleCategory = (linkPath) => {
    setExpandedCategories((prev) => ({
      ...(!prev[linkPath] && { [linkPath]: true }),
    }));
  };

  const liveLink = { name: { en: "LIVE", hi: "लाइव" }, path: "/live" };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setExpandedCategories({});
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // --- Style Helper Functions for Readability ---

  const getNavLinkClass = (linkPath) => {
    const isActive =
      (linkPath === "/" && pathname === "/") ||
      (linkPath !== "/" && pathname.startsWith(linkPath));
    return `relative font-semibold text-xs xl:text-sm tracking-wide h-full flex items-center gap-2 px-2 xl:px-5 transition-all duration-300 rounded-t-lg`;
  };

  const getActiveIndicatorClass = (linkPath) => {
    const isActive =
      (linkPath === "/" && pathname === "/") ||
      (linkPath !== "/" && pathname.startsWith(linkPath));
    return `absolute inset-0 origin-bottom rounded-t-sm mt-2 pt-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] bg-linear-to-b from-red-600 to-red-700 ${
      isActive ? "scale-y-100 animate-active-glow" : "scale-y-0 opacity-0"
    }`;
  };

  const getIconClass = (linkPath) => {
    const isActive =
      (linkPath === "/" && pathname === "/") ||
      (linkPath !== "/" && pathname.startsWith(linkPath));
    return `transition-all duration-300 ${
      isActive
        ? "text-white scale-110"
        : "text-gray-700 group-hover:text-red-600 group-hover:scale-110"
    }`;
  };

  const getTextClass = (linkPath) => {
    const isActive =
      (linkPath === "/" && pathname === "/") ||
      (linkPath !== "/" && pathname.startsWith(linkPath));
    return `transition-all duration-300 whitespace-nowrap ${
      isActive
        ? "text-white font-bold"
        : "text-gray-700 group-hover:text-red-600 font-medium"
    }`;
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 cubic-bezier(0.4,0,0.2,1)] ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-200/50"
            : "bg-white/60 backdrop-blur-md shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-15 lg:h-16 pt-3">
            {/* Logo */}
            <Link href="/" className="flex items-center  group">
              <div className="bg-transparent py-1 rounded flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/Ap-news.png"
                  alt="AP News Logo"
                  className="h-12 md:h-10 2xl:h-12 w-auto object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center flex-1 justify-center mx-8 h-full">
              <div className="flex items-center gap-1 xl:gap-2 h-full">
                {navLinks.map((link, index) => (
                  <div
                    key={link.path}
                    className="relative group h-full"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Main Link */}
                    <Link
                      href={link.path}
                      className={getNavLinkClass(link.path)}
                    >
                      {/* Active Background with Smooth Animation */}
                      <span
                        className={getActiveIndicatorClass(link.path)}
                      ></span>

                      {/* Hover Effect - Only show when not active */}
                      {(link.path === "/"
                        ? pathname !== "/"
                        : !pathname.startsWith(link.path)) && (
                        <span className="absolute inset-0 bg-red-500/5 mt-2 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      )}

                      {/* Content */}
                      <span className="relative flex items-center gap-2 z-10 py-1">
                        <link.icon
                          size={18}
                          className={getIconClass(link.path)}
                        />
                        <span className={getTextClass(link.path)}>
                          {language === "en" ? link.name.en : link.name.hi}
                        </span>
                      </span>
                    </Link>

                    {/* Dropdown Menu */}
                    {(link.subnews || link.categories) && (
                      <div
                        className={`absolute ${
                          link.origin === "right" ? "right-0" : "left-0"
                        } 
                                                    top-full z-50 w-[520px] max-w-[90vw] 
                                                    opacity-0 invisible pointer-events-none 
                                                    group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto 
                                                    transition-opacity duration-300 ease-in-out`}
                      >
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-gray-900/20 border border-gray-100/50 p-2.5 min-h-40 mt-2">
                          {!link.image && link.categories && (
                            <div className="grid grid-cols-2 gap-2.5 auto-rows-fr">
                              {link.categories.map((cat, catIndex) => (
                                <Link
                                  key={catIndex}
                                  href={cat.path}
                                  className="group/cat relative rounded-lg p-2.5 bg-gray-50/50 border border-transparent hover:border-red-200 hover:shadow-lg hover:shadow-red-100/50 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                                  style={{
                                    transition: `opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s ease, border-color 0.3s ease`,
                                    transitionDelay: `${catIndex * 60}ms`,
                                  }}
                                >
                                  <div className="flex items-start gap-2.5 flex-1">
                                    <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-red-50 to-red-100 group-hover/cat:from-red-100 group-hover/cat:to-red-200 flex items-center justify-center transition-all duration-300 group-hover/cat:scale-110 group-hover/cat:rotate-3">
                                      <cat.icon
                                        size={20}
                                        className="text-red-600 transition-transform duration-300"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col">
                                      <h3 className="text-red-700 font-bold text-xs mb-0.5 group-hover/cat:text-red-800 transition-colors leading-tight">
                                        {language === "en"
                                          ? cat.name.en
                                          : cat.name.hi}
                                      </h3>
                                      <p className="text-[10px] text-gray-600 leading-snug line-clamp-2 flex-1">
                                        {language === "en"
                                          ? cat.description.en
                                          : cat.description.hi}
                                      </p>
                                    </div>
                                  </div>
                                  {/* Hover gradient overlay */}
                                  <div className="absolute inset-0 bg-linear-to-br from-red-500/5 to-transparent rounded-lg opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300"></div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-2.5">
              {/* Live Button */}
              <Link
                href={liveLink.path}
                className={`relative font-bold text-[9px] xl:text-[10px] tracking-wider transition-all duration-300 px-2 xl:px-2.5 py-1 xl:py-1 rounded-full flex items-center gap-1.5 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 ${
                  pathname === liveLink.path
                    ? "bg-linear-to-r from-red-600 to-red-700 text-white ring-1 ring-red-200 ring-offset-1"
                    : "bg-white text-red-700 border border-red-100 hover:border-red-300 hover:bg-red-50"
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full animate-ping ${
                      pathname === liveLink.path
                        ? "bg-white opacity-75"
                        : "bg-red-600 opacity-60"
                    }`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      pathname === liveLink.path ? "bg-white" : "bg-red-600"
                    }`}
                  ></span>
                </span>
                {liveLink.name[language]}
              </Link>

              {/* Join Team Button */}
              <button
                onClick={() => setIsJoinPopupOpen(true)}
                className="flex items-center gap-1.5 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-2 xl:px-2.5 py-1 xl:py-1 rounded-full hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 font-bold text-[9px] xl:text-[10px] tracking-wide transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <FaUserPlus
                  size={10}
                  className="xl:w-3 xl:h-3 transition-transform duration-300 group-hover:rotate-12"
                />
                <span className="whitespace-nowrap">
                  {language === "hi" ? "हमसे जुड़ें" : "JOIN TEAM"}
                </span>
              </button>

              {/* Language Toggle */}
              <div
                className="flex items-center cursor-pointer bg-gray-100 rounded-full p-0.5 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
                onClick={toggleLanguage}
              >
                <span
                  className={`px-1.5 xl:px-2 py-0.5 text-[8px] xl:text-[9px] font-bold rounded-full transition-all duration-300 ${
                    language === "en"
                      ? "bg-white text-red-700 shadow-sm scale-105"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  EN
                </span>
                <span
                  className={`px-1.5 xl:px-2 py-0.5 text-[8px] xl:text-[9px] font-bold rounded-full transition-all duration-300 ${
                    language === "hi"
                      ? "bg-white text-red-700 shadow-sm scale-105"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  HI
                </span>
              </div>

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="relative text-gray-600 hover:text-red-600 transition-all duration-300 p-1.5 xl:p-2 rounded-full hover:bg-red-50 active:scale-95 group"
                aria-label="Search"
              >
                <FaSearch
                  size={14}
                  className="xl:w-4 xl:h-4 transition-transform duration-300 group-hover:scale-110"
                />
              </button>

              {/* Notifications Button */}
              {/* <button
                                className="relative text-gray-600 hover:text-red-600 transition-all duration-300 p-2.5 rounded-full hover:bg-red-50 active:scale-95 group"
                                aria-label="Notifications"
                            >
                                <FaBell
                                    size={16}
                                    className="xl:w-5 xl:h-5 transition-transform duration-300 group-hover:scale-110"
                                />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                            </button> */}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
              {/* Mobile Live Button */}
              <Link
                href={liveLink.path}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold border transition-all duration-300 ${
                  pathname === liveLink.path
                    ? "bg-linear-to-r from-red-600 to-red-700 text-white border-red-700 shadow-lg"
                    : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300"
                }`}
              >
                <span className="relative flex h-1.2 w-1.2">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full animate-ping ${
                      pathname === liveLink.path
                        ? "bg-white opacity-75"
                        : "bg-red-600 opacity-60"
                    }`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                      pathname === liveLink.path ? "bg-white" : "bg-red-600"
                    }`}
                  ></span>
                </span>
                {liveLink.name[language]}
              </Link>

              {/* Mobile Language Toggle */}
              <div
                className="flex items-center cursor-pointer bg-gray-100 rounded-full p-0.5 border border-gray-200"
                onClick={toggleLanguage}
              >
                <span
                  className={`px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold rounded-full transition-all duration-300 ${
                    language === "en"
                      ? "bg-white text-red-700 shadow-sm"
                      : "text-gray-500"
                  }`}
                >
                  EN
                </span>
                <span
                  className={`px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold rounded-full transition-all duration-300 ${
                    language === "hi"
                      ? "bg-white text-red-700 shadow-sm"
                      : "text-gray-500"
                  }`}
                >
                  HI
                </span>
              </div>

              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-700 hover:text-red-600 focus:outline-none p-1.5 sm:p-2 hover:bg-red-50 rounded-full transition-all duration-300 active:scale-95"
                aria-label="Search"
              >
                <FaSearch size={16} className="sm:w-4 sm:h-4" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-red-600 focus:outline-none p-2.5 hover:bg-red-50 rounded-full transition-all duration-300 active:scale-95"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <FaTimes
                    size={22}
                    className="sm:w-6 sm:h-6 transition-transform duration-300 rotate-90"
                  />
                ) : (
                  <FaBars
                    size={22}
                    className="sm:w-6 sm:h-6 transition-transform duration-300"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-100 lg:hidden transition-opacity duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop with blur */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-500"
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* Menu Panel with glassmorphism */}
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-linear-to-br from-red-900 via-red-800 to-red-900 shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-red-700/50 bg-red-900/50 backdrop-blur-sm">
              <h2 className="text-white font-bold text-xl tracking-wide">
                {language === "en" ? "Menu" : "मेनू"}
              </h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white/80 hover:text-white transition-all duration-300 p-2 rounded-full hover:bg-white/10 active:scale-95"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Scrollable Menu Content */}
            <div className="flex-1 overflow-y-auto  custom-scrollbar">
              <div className="flex flex-col py-2">
                {navLinks.map((link, index) => (
                  <div
                    key={link.path}
                    className="border-b border-red-700/30"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {link.categories ? (
                      <>
                        <div className="w-full flex items-center justify-between relative">
                          <Link href={link.path} className="flex-1">
                            <div
                              className={`flex items-center gap-3 w-full transition-all duration-300 ${
                                pathname.startsWith(link.path)
                                  ? "bg-red-700/40 text-white shadow-lg"
                                  : "text-white/90 hover:bg-red-700/20"
                              } px-5 py-4 rounded-lg mx-2 my-1`}
                            >
                              <link.icon
                                size={22}
                                className="text-white transition-transform duration-300"
                              />
                              <span className="font-semibold text-base">
                                {language === "en"
                                  ? link.name.en
                                  : link.name.hi}
                              </span>
                            </div>
                          </Link>

                          <button
                            onClick={() => toggleCategory(link.path)}
                            className="ml-3 text-white/70 hover:text-white transition-all duration-300 p-2 rounded-full hover:bg-white/10"
                          >
                            {expandedCategories[link.path] ? (
                              <FaChevronUp
                                size={14}
                                className="transition-transform duration-300"
                              />
                            ) : (
                              <FaChevronDown
                                size={14}
                                className="transition-transform duration-300"
                              />
                            )}
                          </button>
                        </div>

                        {/* Expanded Categories */}
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            expandedCategories[link.path]
                              ? "max-h-[500px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="bg-red-900/40 pb-3 px-2">
                            {link.categories.map((cat, catIndex) => (
                              <Link
                                key={catIndex}
                                href={cat.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center gap-3 px-7 py-3.5 mx-2 my-1.5 rounded-xl transition-all duration-300 ${
                                  pathname === cat.path
                                    ? "bg-white text-red-700 shadow-lg"
                                    : "text-white/80 hover:bg-white/10 hover:translate-x-1"
                                }`}
                              >
                                <div className="shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                  <cat.icon size={18} />
                                </div>
                                <div className="flex flex-col flex-1">
                                  <span className="font-medium text-sm">
                                    {language === "en"
                                      ? cat.name.en
                                      : cat.name.hi}
                                  </span>
                                  <span className="text-xs opacity-75 mt-0.5 leading-relaxed">
                                    {language === "en"
                                      ? cat.description.en
                                      : cat.description.hi}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`w-full flex items-center gap-3 px-5 py-4 mx-2 my-1 rounded-xl transition-all duration-300 ${
                          pathname === link.path
                            ? "bg-red-700/40 text-white shadow-lg"
                            : "text-white/90 hover:bg-red-700/20"
                        }`}
                      >
                        <link.icon size={22} className="text-white" />
                        <span className="font-semibold text-base">
                          {language === "en" ? link.name.en : link.name.hi}
                        </span>
                      </Link>
                    )}
                  </div>
                ))}

                {/* Live Link */}
                <div className="border-b border-red-700/30">
                  <Link
                    href={liveLink.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`w-full flex items-center gap-3 px-5 py-4 mx-2 my-1 rounded-xl transition-all duration-300 ${
                      pathname === liveLink.path
                        ? "bg-red-700/40 text-white shadow-lg"
                        : "text-white/90 hover:bg-red-700/20"
                    }`}
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-white animate-ping opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                    <span className="font-semibold text-base">
                      {language === "en" ? liveLink.name.en : liveLink.name.hi}
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-red-700/50 p-5 space-y-3 bg-red-900/50 backdrop-blur-sm">
              <button
                onClick={() => {
                  setIsJoinPopupOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
              >
                <FaUserPlus
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
                <span>{language === "hi" ? "हमसे जुड़ें" : "JOIN TEAM"}</span>
              </button>

              {/* Language Toggle */}
              <div className="flex items-center justify-center">
                <div
                  className="flex items-center cursor-pointer bg-white/10 rounded-full p-1 border border-white/20 hover:border-white/40 transition-all duration-300"
                  onClick={toggleLanguage}
                >
                  <span
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
                      language === "en"
                        ? "bg-white text-red-700 shadow-lg scale-105"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    EN
                  </span>
                  <span
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
                      language === "hi"
                        ? "bg-white text-red-700 shadow-lg scale-105"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    HI
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <JoinTeamPopup
        isOpen={isJoinPopupOpen}
        onClose={() => setIsJoinPopupOpen(false)}
        language={language}
      />
    </>
  );
};

export default Navbar;
