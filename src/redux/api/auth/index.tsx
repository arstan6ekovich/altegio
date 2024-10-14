import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getUserAuth: build.query<AUTH.GetAuthResponse, AUTH.GetAuthRequest>({
      query: () => ({
        url: "/auth/user",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    postUserSignin: build.mutation({
      query: (newData) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["auth"],
    }),
    postUserSignup: build.mutation({
      query: (newData) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useGetUserAuthQuery,
  usePostUserSignupMutation,
  usePostUserSigninMutation,
} = api;
