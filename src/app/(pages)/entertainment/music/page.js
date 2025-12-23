"use client";

import { useEffect, useState } from "react";
import TrendingSongs from "@/components/entertainment/TrendingSongs";
import MusicPlayerHero from "@/components/entertainment/MusicPlayerHero";
import {
  useGetAllPlaylistsQuery,
  useGettrackbyplaylistIdQuery,
} from "@/store/api/entertainment";

export default function MusicPage() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  /* ================= PLAYLISTS ================= */
  const { data: playlistsData, isLoading } = useGetAllPlaylistsQuery();
  const playlists = playlistsData?.data || [];

  useEffect(() => {
    if (!selectedPlaylistId && playlists.length > 0) {
      setSelectedPlaylistId(playlists[0]._id);
    }
  }, [playlists, selectedPlaylistId]);

  /* ================= TRACKS ================= */
  const { data: tracksData, isLoading: isTracksLoading } =
    useGettrackbyplaylistIdQuery(selectedPlaylistId, {
      skip: !selectedPlaylistId,
    });

  const songs = tracksData?.data?.tracks || [];
  const currentSong = songs[currentSongIndex];

  /* ================= HANDLERS ================= */
  const handlePlay = (song) => {
    const index = songs.findIndex((s) => s._id === song._id);
    if (index === -1) return;

    if (currentSongIndex === index) {
      setIsPlaying((p) => !p);
    } else {
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!songs.length) return;
    setCurrentSongIndex((i) => (i + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (!songs.length) return;
    setCurrentSongIndex((i) => (i - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  if (isLoading) {
    return <div className="p-10 text-center">Loading playlists…</div>;
  }

  return (
    <div className="space-y-8">
      {/* Playlist Select */}
      <div className="flex justify-between items-center">
        <label className="font-semibold">Select Playlist:</label>
        <select
          className="border px-3 py-2 rounded-md"
          value={selectedPlaylistId || ""}
          onChange={(e) => {
            setSelectedPlaylistId(e.target.value);
            setCurrentSongIndex(0);
            setIsPlaying(false);
          }}
        >
          {playlists.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {/* Player */}
      {songs.length > 0 ? (
        <MusicPlayerHero
          currentSong={currentSong}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((p) => !p)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      ) : (
        <div className="p-10 bg-gray-100 rounded text-center">
          {isTracksLoading ? "Loading tracks…" : "No tracks in playlist"}
        </div>
      )}

      <TrendingSongs
        songs={songs}
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlay={handlePlay}
      />
    </div>
  );
}
