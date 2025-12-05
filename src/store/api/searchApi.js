import { API_BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    searchArticles: builder.query({
      query: ({ q, page = 1, limit = 10 }) => ({
        url: "articles/search",
        params: { q, page, limit },
      }),
    }),
  }),
});

export const { useSearchArticlesQuery, useLazySearchArticlesQuery } = searchApi;
