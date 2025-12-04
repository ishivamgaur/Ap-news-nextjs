import FeaturedVideoHero from "@/components/entertainment/FeaturedVideoHero";
import LatestTrailers from "@/components/entertainment/LatestTrailers";
import PopularMovies from "@/components/entertainment/PopularMovies";
import MoreVideos from "@/components/entertainment/MoreVideos";

export const metadata = {
  title: "Videos | Entertainment | AP News",
  description: "Watch the latest entertainment videos and documentaries.",
};

export default function VideosPage() {
  return (
    <div className="space-y-12">
      <FeaturedVideoHero />
      <PopularMovies />
      <LatestTrailers />
      <MoreVideos />
    </div>
  );
}
