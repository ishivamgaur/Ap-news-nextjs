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
      transformResponse: (response) => response,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg === 1 || !currentCache?.items) return newItems;
        currentCache.items.push(...newItems.items);
        currentCache.page = newItems.page;
        currentCache.total = newItems.total;
        currentCache.limit = newItems.limit;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ["Articles"],
    }),

    //! GET BUISINESS ARTICLES
    getBusinessArticles: builder.query({
      query: (page = 1) => ({
        url: `/articles/category/Business?page=${page}`,
        method: "get",
      }),
      transformResponse: (response) => response,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg === 1 || !currentCache?.articles) return newItems;
        currentCache.articles.push(...newItems.articles);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ["Articles"],
    }),

    //! GET BHOJPURI ARTICLES
    getBhojpuriArticles: builder.query({
      query: (page = 1) => ({
        url: `/articles/category/Bhojpuri?page=${page}`,
        method: "get",
      }),
      transformResponse: (response) => response,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg === 1 || !currentCache?.articles) return newItems;
        currentCache.articles.push(...newItems.articles);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ["Articles"],
    }),

    //! GET TECHNOLOGY ARTICLES
    getTechnologyArticles: builder.query({
      query: (page = 1) => ({
        url: `/articles/category/Technology?page=${page}`,
        method: "get",
      }),
      transformResponse: (response) => response,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg === 1 || !currentCache?.articles) return newItems;
        currentCache.articles.push(...newItems.articles);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ["Articles"],
    }),

    //! GET ELECTION ARTICLES
    getElectionsArticles: builder.query({
      query: (page = 1) => ({
        url: `/articles/category/Elections?page=${page}`,
        method: "get",
      }),
      transformResponse: (response) => response,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg === 1 || !currentCache?.articles) return newItems;
        currentCache.articles.push(...newItems.articles);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ["Articles"],
    }),

    //! GET SPORTS ARTICLES
    getSportsArticles: builder.query({
      query: (page = 1) => ({
        url: `/articles/category/Sports?page=${page}`,
        method: "get",
      }),
      transformResponse: (response) => response,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg === 1 || !currentCache?.articles) return newItems;
        currentCache.articles.push(...newItems.articles);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
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
