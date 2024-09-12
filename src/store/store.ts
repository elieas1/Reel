import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {videosApi} from './videos/videosApi'; // Your API service
import videosReducer from './videos/videosSlice'; // Import your slice
import {TypedUseSelectorHook, useSelector} from 'react-redux';

// Configure the store and combine both the slice and the API reducer
export const store = configureStore({
  reducer: {
    [videosApi.reducerPath]: videosApi.reducer, // RTK Query API reducer
    videos: videosReducer, // Your videos slice reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(videosApi.middleware), // Add the API middleware
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
