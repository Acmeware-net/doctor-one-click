import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });
const USERS_URL = '/api';
export const doctorApiSlice = createApi({
  baseQuery,
  tagTypes: ['Doctor'],
  endpoints: (build) => ({
    getDoctors: build.query({
      query: () => `${USERS_URL}/users/doctors`,
      method:'GET',
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetDoctorsQuery,
} = doctorApiSlice;