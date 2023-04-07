import { apiSlice } from "../../app/api/apiSlice";

export const uploadsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (body) => ({
        url: "/uploads/image",
        method: "POST",
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "multipart/form-data");
          return headers;
        },
        body,
      }),
    }),
  }),
});

export const {
  useUploadImageMutation,
} = uploadsApiSlice;
