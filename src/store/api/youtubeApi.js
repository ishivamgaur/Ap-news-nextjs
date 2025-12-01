import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const youtubeApi = createApi({
  reducerPath: "youtubeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }), // Assuming your backend proxy is at /api
  tagTypes: ["LiveVideo"],
  endpoints: (builder) => ({
    getLiveVideo: builder.query({
      query: () => "youtube/live",
      // Provides a tag to this query. This can be used to invalidate the cache.
      providesTags: ["LiveVideo"],
      // Data is considered fresh for 60 seconds (1 minute).
      // If a component subscribes within this time, no new fetch will occur.
      staleTime: 60 * 1000, // 1 minute
    }),
    getRecentVideos: builder.query({
      query: () => "youtube/recent-videos",
      // Also set staleTime for recent videos to match desired persistence
      staleTime: 60 * 1000, // 1 minute
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLiveVideoQuery, useGetRecentVideosQuery } = youtubeApi;
