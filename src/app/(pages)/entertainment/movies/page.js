import MovieReviews from "@/components/entertainment/MovieReviews";
import FeaturedMovieHero from "@/components/entertainment/FeaturedMovieHero";

export const metadata = {
  title: "Movies | Entertainment | AP News",
  description: "Read the latest movie reviews and ratings.",
};

export default function MoviesPage() {
  return (
    <div className="space-y-8">
      <FeaturedMovieHero />
      <h1 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
        Movie Reviews
      </h1>
      <MovieReviews />
    </div>
  );
}
