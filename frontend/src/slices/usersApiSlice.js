import { apiSlice } from './apiSlice';
const USERS_URL = '/api';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/users/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `${USERS_URL}/users/logout`,
        method: 'POST',
      }),
    }),
    register: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/users`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/users/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    disableUser: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/users/profile`,
        method: 'DELETE',
        body: data,
      }),
    }),
    restoreUser: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/users/profile`,
        method: 'POST',
        body: data,
      }),
    }),
    getDoctors: build.query({
      query: () => `${USERS_URL}/users/doctors`,
      method:'GET',
      keepUnusedDataFor: 5,
    }),
    getDoctorById: build.query({
      query: (id) => `${USERS_URL}/users/doctors/${id}`,
      method:'GET',
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useDisableUserMutation,
  useRestoreUserMutation,
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
} = userApiSlice;
