"use client";

import { useState } from "react";
import TrendingSongs from "@/components/entertainment/TrendingSongs";
import MusicPlayerHero from "@/components/entertainment/MusicPlayerHero";

// Unified Playlist Data
const heroPlaylist = [
  {
    id: "hero-1",
    title: "Midnight City Vibes",
    artist: "The Neon Lights",
    album: "Synthwave Classics",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1470&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "bg-purple-600",
    gradient: "from-purple-900",
  },
  {
    id: "hero-2",
    title: "Summer Breeze",
    artist: "Ocean Waves",
    album: "Chill Lo-Fi",
    cover:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "bg-blue-500",
    gradient: "from-blue-900",
  },
  {
    id: "hero-3",
    title: "Urban Nights",
    artist: "City Walkers",
    album: "Jazz Hop",
    cover:
      "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1374&auto=format&fit=crop",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "bg-orange-500",
    gradient: "from-orange-900",
  },
];

const trendingPlaylist = [
  {
    id: 1,
    title: "Kesariya",
    artist: "Arijit Singh",
    album: "Brahmāstra",
    cover:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1470&auto=format&fit=crop",
    duration: "4:28",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "bg-red-600",
    gradient: "from-red-900",
  },
  {
    id: 2,
    title: "Apna Bana Le",
    artist: "Arijit Singh",
    album: "Bhediya",
    cover:
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1470&auto=format&fit=crop",
    duration: "3:50",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "bg-orange-600",
    gradient: "from-orange-900",
  },
  {
    id: 3,
    title: "Maan Meri Jaan",
    artist: "King",
    album: "Champagne Talk",
    cover:
      "https://images.unsplash.com/photo-1459749411177-0473ef71607b?q=80&w=1470&auto=format&fit=crop",
    duration: "3:14",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "bg-yellow-600",
    gradient: "from-yellow-900",
  },
  {
    id: 4,
    title: "Jhoome Jo Pathaan",
    artist: "Vishal-Shekhar",
    album: "Pathaan",
    cover:
      "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1374&auto=format&fit=crop",
    duration: "3:22",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    color: "bg-green-600",
    gradient: "from-green-900",
  },
  {
    id: 5,
    title: "Tere Pyaar Mein",
    artist: "Arijit Singh",
    album: "TJMM",
    cover:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=1472&auto=format&fit=crop",
    duration: "4:05",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    color: "bg-teal-600",
    gradient: "from-teal-900",
  },
  {
    id: 6,
    title: "Calm Down",
    artist: "Rema, Selena Gomez",
    album: "Rave & Roses",
    cover:
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=1470&auto=format&fit=crop",
    duration: "3:59",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    color: "bg-blue-600",
    gradient: "from-blue-900",
  },
  {
    id: 7,
    title: "Flowers",
    artist: "Miley Cyrus",
    album: "Endless Summer Vacation",
    cover:
      "https://images.unsplash.com/photo-1500099817043-86d46000d58f?q=80&w=1468&auto=format&fit=crop",
    duration: "3:20",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    color: "bg-indigo-600",
    gradient: "from-indigo-900",
  },
  {
    id: 8,
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    cover:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1470&auto=format&fit=crop",
    duration: "2:47",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    color: "bg-pink-600",
    gradient: "from-pink-900",
  },
  {
    id: 9,
    title: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    cover:
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1470&auto=format&fit=crop",
    duration: "3:20",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    color: "bg-rose-600",
    gradient: "from-rose-900",
  },
  {
    id: 10,
    title: "Unholy",
    artist: "Sam Smith, Kim Petras",
    album: "Gloria",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1470&auto=format&fit=crop",
    duration: "2:36",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    color: "bg-purple-600",
    gradient: "from-purple-900",
  },
  {
    id: 11,
    title: "Rich Flex",
    artist: "Drake, 21 Savage",
    album: "Her Loss",
    cover:
      "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1374&auto=format&fit=crop",
    duration: "3:59",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    color: "bg-cyan-600",
    gradient: "from-cyan-900",
  },
  {
    id: 12,
    title: "Starboy",
    artist: "The Weeknd",
    album: "Starboy",
    cover:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1470&auto=format&fit=crop",
    duration: "3:50",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    color: "bg-fuchsia-600",
    gradient: "from-fuchsia-900",
  },
];

const allSongs = [...heroPlaylist, ...trendingPlaylist];

export default function MusicPage() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = allSongs[currentSongIndex];

  const handlePlay = (song) => {
    const index = allSongs.findIndex((s) => s.id === song.id);
    if (index !== -1) {
      if (currentSongIndex === index) {
        setIsPlaying(!isPlaying);
      } else {
        setCurrentSongIndex(index);
        setIsPlaying(true);
      }
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % allSongs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex(
      (prev) => (prev - 1 + allSongs.length) % allSongs.length
    );
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-8">
      <MusicPlayerHero
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
      />
      <h1 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
        Music & Trending
      </h1>
      <TrendingSongs
        songs={trendingPlaylist}
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlay={handlePlay}
      />
    </div>
  );
}
