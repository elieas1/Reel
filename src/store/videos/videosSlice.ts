import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {VideosInitialState} from './videosApi.types';

const initialState: VideosInitialState = {
  videos: [],
  next_page: '',
};

const videosSlice = createSlice({
  name: 'videos',
  initialState: initialState,
  reducers: {
    setVideos(state, action: PayloadAction<VideosInitialState>) {
      state.videos = [...state.videos, ...action.payload.videos];
      state.next_page = action.payload.next_page;
    },
    likeVideo(
      state,
      action: PayloadAction<{videoId: string; canUnlike: boolean}>,
    ) {
      const video = state.videos.find(
        Item => Item.id === action.payload.videoId,
      );
      if (!video) {
        return state;
      }

      if (video.liked) {
        if (action.payload.canUnlike) {
          video.likes_count = video.likes_count! - 1;
          video.liked = false;
        }
      } else {
        video.likes_count = video.likes_count! + 1;
        video.liked = true;
      }
    },
  },
});

export const {setVideos, likeVideo} = videosSlice.actions;
export default videosSlice.reducer;
