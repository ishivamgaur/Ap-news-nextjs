import { FaPlay } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const VideoCard = ({ video, onPlay }) => {
  const { language } = useLanguage();
  const { title, youtubeVideoId } = video;
  const thumbnailUrl = `https://i3.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg`;

  return (
    <div
      className="relative group cursor-pointer rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
      onClick={() => onPlay(youtubeVideoId)}
    >
      <div className="relative aspect-video">
        <img
          src={thumbnailUrl}
          alt={title[language]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
            <FaPlay className="text-white text-sm ml-1" />
          </div>
          <h3 className="text-white font-bold text-sm md:text-[14px] lg:text-xs xl:text-xs leading-tight line-clamp-2 drop-shadow-md font-serif">
            {title[language]}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
