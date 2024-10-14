import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API}`,
  prepareHeaders: (headers) => {
    let token = JSON.parse(String(localStorage.getItem("user")));
    if (!token) {
      token = JSON.parse(String(sessionStorage.getItem("user")));
    }
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const results = await baseQuery(args, api, extraOptions);
  return results;
};

export const api = createApi({
  baseQuery: baseQueryExtended,
  reducerPath: "api",
  refetchOnFocus: true,
  refetchOnReconnect: false,
  tagTypes: ["auth"],
  endpoints: () => ({}),
});
