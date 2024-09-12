import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {VideosResponse} from './videosApi.types';

export const videosApi = createApi({
  baseQuery: fetchBaseQuery({baseUrl: ''}),
  endpoints: builder => ({
    getVideos: builder.query<VideosResponse, string>({
      query: url => url,
    }),
  }),
});

export const {useLazyGetVideosQuery} = videosApi;
