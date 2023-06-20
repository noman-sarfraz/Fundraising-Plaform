import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { SERVER_BASE_URL } from "../../config/index.js";

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:5000/api/v1`,
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token;

    // if (token) {
    //   headers.set("authorization", `Bearer ${token}`);
    // }
    return headers;
  },
  credentials: "include"
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["campaigns", "fundraisers", "donors", "admin", "categories", "donations"],
  endpoints: (builder) => ({}),
});
