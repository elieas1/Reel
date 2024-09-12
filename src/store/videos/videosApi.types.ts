import {VideoItem} from '../../screens/homeScreen/HomeScreen.types';

export type VideosResponse = {
  videos: VideoItem[];
  next_page: string;
};

export interface StateVideo extends VideoItem {
  liked?: boolean;
}

export interface VideosInitialState {
  videos: StateVideo[];
  next_page: string;
}
