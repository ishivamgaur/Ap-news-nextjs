import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

/* ================= CONFIG ================= */

const API_BASE_URL = "https://api.apnewsbihar.in/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= AXIOS BASE QUERY ================= */

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, params }) => {
    try {
      const result = await api({
        url: baseUrl + url,
        method,
        params,
      });

      return { data: result.data };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

/* ================= API ================= */

export const entertainmentApi = createApi({
  reducerPath: "entertainmentApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),

  tagTypes: [
    "Video",
    "VideoList",
    "Audio",
    "AudioList",
    "Category",
    "CategoryList",
    "SubCategory",
    "SubCategoryList",
    "Playlist",
    "PlaylistList",
    "cloudinary",
  ],

  endpoints: (builder) => ({

    /* ================= VIDEO ================= */

    fetchVideos: builder.query({
      query: () => ({ url: "/media/video/list", method: "get" }),
      providesTags: [{ type: "VideoList", id: "LIST" }],
    }),

    getOnlyVideos: builder.query({
      query: () => ({ url: "/media/video", method: "get" }),
      providesTags: [{ type: "VideoList", id: "LIST" }],
    }),

    getVideoById: builder.query({
      query: (videoId) => ({
        url: `/media/video/${videoId}`,
        method: "get",
      }),
      providesTags: (result, error, id) => [{ type: "Video", id }],
    }),

    /* ================= AUDIO ================= */

    fetchAudios: builder.query({
      query: () => ({ url: "/media/audio", method: "get" }),
      providesTags: [{ type: "AudioList", id: "LIST" }],
    }),

    /* ================= CATEGORY ================= */

    fetchCategoryTree: builder.query({
      query: () => ({ url: "/media/categories/tree", method: "get" }),
      providesTags: [{ type: "CategoryList", id: "LIST" }],
    }),

    fetchCategories: builder.query({
      query: () => ({ url: "/media/categories/list", method: "get" }),
      providesTags: [{ type: "CategoryList", id: "LIST" }],
    }),

    fetchSubcategories: builder.query({
      query: (params) => ({
        url: "/media/subcategories/list",
        method: "get",
        params,
      }),
      providesTags: [{ type: "SubCategoryList", id: "LIST" }],
    }),

    /* ================= PLAYLIST ================= */

    getAllPlaylists: builder.query({
      query: () => ({
        url: "/media/audio/playlists",
        method: "get",
      }),
      providesTags: [{ type: "PlaylistList", id: "LIST" }],
    }),

    gettrackbyplaylistId: builder.query({
      query: (playlistId) => ({
        url: `/media/audio/playlist/${playlistId}`,
        method: "get",
      }),
      providesTags: (result, error, id) => [
        { type: "Playlist", id },
      ],
    }),

    /* ================= SEARCH ================= */

    searchAudio: builder.query({
      query: ({ keyword, sortBy = "asc" }) => ({
        url: "/media/audio/search",
        method: "get",
        params: { q: keyword, sortBy },
      }),
      providesTags: [{ type: "AudioList", id: "LIST" }],
    }),

    /* ================= CLOUDINARY ================= */

    fetchCloudinaryUsage: builder.query({
      query: () => ({
        url: "/cloudinary/usage",
        method: "get",
      }),
      providesTags: [{ type: "cloudinary", id: "Usage" }],
    }),
  }),
});

/* ================= EXPORT HOOKS ================= */

export const {
  // Video
  useFetchVideosQuery,
  useGetOnlyVideosQuery,
  useGetVideoByIdQuery,

  // Audio
  useFetchAudiosQuery,
  useSearchAudioQuery,

  // Category
  useFetchCategoryTreeQuery,
  useFetchCategoriesQuery,
  useFetchSubcategoriesQuery,

  // Playlist
  useGetAllPlaylistsQuery,
  useGettrackbyplaylistIdQuery,

  // Cloudinary
  useFetchCloudinaryUsageQuery,
} = entertainmentApi;
