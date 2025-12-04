import ScheduledStreams from "@/components/entertainment/ScheduledStreams";
import FeaturedShowHero from "@/components/entertainment/FeaturedShowHero";

export const metadata = {
  title: "Shows | Entertainment | AP News",
  description: "Check out the schedule for upcoming entertainment shows.",
};

export default function ShowsPage() {
  return (
    <div className="space-y-8">
      <FeaturedShowHero />
      <h1 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
        TV Shows & Schedule
      </h1>
      <ScheduledStreams />
    </div>
  );
}
