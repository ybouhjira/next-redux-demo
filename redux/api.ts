// create api with RTK Query form /api/books/
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Book {
  id: number;
  title: string;
}

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => "/books",
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;
