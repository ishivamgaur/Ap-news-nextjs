import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosBaseQuery =
  ({ baseUrl }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const articleApiSlice = createApi({
  reducerPath: "articleApi",
  baseQuery: axiosBaseQuery({ baseUrl: "https://ap-news-b.onrender.com/api" }),
  tagTypes: ["Articles"],
  endpoints: (builder) => ({
    //! GET ALL ARTICLES
    getAllNewsArticles: builder.query({
      query: (page = 1) => ({
        url: `/articles/all?page=${page}`,
        method: "get",
      }),
      // Normalize the response so the hook always returns { items, pagination }
      transformResponse: (response) => response, // now `data` is stripped out

      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache, newItems, { arg }) => {
        // When starting fresh (page 1), replace everything
        if (arg === 1 || !currentCache?.items) {
          return newItems;
        }

        // Append new articles
        currentCache.items.push(...newItems.items);

        // Replace pagination info (optional)
        currentCache.pagination = newItems.pagination;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },

      providesTags: ["Articles"],
    }),

    //! GET BUISINESS ARTICLES
    getBusinessArticles: builder.query({
      query: () => ({ url: "articles/category/Business", method: "get" }),
      providesTags: ["Articles"],
    }),

    //! GET BHOJPURI ARTICLES
    getBhojpuriArticles: builder.query({
      query: () => ({ url: "articles/category/Bhojpuri", method: "get" }),
      providesTags: ["Articles"],
    }),

    //! GET TECHNOLOGY ARTICLES
    getTechnologyArticles: builder.query({
      query: () => ({ url: "articles/category/Technology", method: "get" }),
      providesTags: ["Articles"],
    }),

    //! GET ELECTION ARTICLES
    getElectionsArticles: builder.query({
      query: () => ({ url: "articles/category/Elections", method: "get" }),
      providesTags: ["Articles"],
    }),

    //! GET SPORTS ARTICLES
    getSportsArticles: builder.query({
      query: () => ({ url: "articles/category/Sports", method: "get" }),
      providesTags: ["Articles"],
    }),

    //! GET ARTICLE-DETAILS BY ID
    getArticleById: builder.query({
      query: (id) => ({ url: `articles/${id}`, method: "get" }),
      providesTags: ["Articles"],
    }),
  }),
});

export const {
  useGetAllNewsArticlesQuery,
  useGetBusinessArticlesQuery,
  useGetBhojpuriArticlesQuery,
  useGetTechnologyArticlesQuery,
  useGetElectionsArticlesQuery,
  useGetSportsArticlesQuery,
  useGetArticleByIdQuery,
} = articleApiSlice;
