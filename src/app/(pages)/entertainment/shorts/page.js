import ShortsPlayer from "@/components/entertainment/ShortsPlayer";

export const metadata = {
  title: "Shorts | Entertainment | AP News",
  description: "Watch trending short videos and reels.",
};

export default function ShortsPage() {
  return (
    <div className="flex justify-center min-h-[80vh]">
      <ShortsPlayer />
    </div>
  );
}
