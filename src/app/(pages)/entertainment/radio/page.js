import RadioPlayer from "@/components/entertainment/RadioPlayer";

export const metadata = {
  title: "Live Radio | Entertainment | AP News",
  description: "Listen to live radio stations and music.",
};

export default function RadioPage() {
  return (
    <div className="space-y-8">
      <RadioPlayer />
    </div>
  );
}
