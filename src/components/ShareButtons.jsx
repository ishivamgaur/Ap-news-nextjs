// "use client"
import React from "react";

const ShareButtons = ({ title, url }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      // fallback: copy link
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard");
      } catch (err) {
        console.error("Copy failed:", err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="px-3 py-1 lg:px-2 lg:py-0.5 bg-gray-100 rounded text-sm lg:text-xs xl:text-sm text-gray-700 hover:bg-gray-200 transition-colors"
    >
      Share
    </button>
  );
};

export default ShareButtons;
