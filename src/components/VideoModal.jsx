import Link from "next/link";
import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";

const VideoModal = ({ videoId, articleId, category, onClose }) => {
  if (!videoId) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 text-3xl hover:text-white transition-colors"
        >
          <FaTimes />
        </button>
        <div className="aspect-w-16 aspect-h-9  h-[70vh] rounded-lg overflow-hidden shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {articleId && (
          <div className="mt-4 flex justify-center">
            <Link
              href={
                category === "General"
                  ? `/news/article/${articleId}`
                  : `/${category?.toLowerCase()}/article/${articleId}`
              }
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold transition-colors"
            >
              View Article <FaExternalLinkAlt className="text-sm" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
