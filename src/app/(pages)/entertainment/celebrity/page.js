import CelebrityNews from "@/components/entertainment/CelebrityNews";

export const metadata = {
  title: "Celebrity News | Entertainment | AP News",
  description: "Latest celebrity gossip, fashion, and lifestyle updates.",
};

export default function CelebrityPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
        Celebrity News
      </h1>
      <CelebrityNews />
    </div>
  );
}
