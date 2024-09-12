import {VideoItem} from '../../../screens/homeScreen/HomeScreen.types';

export interface ShortVideoTypes extends VideoItem {
  isVisible: boolean;
  onVideoEnd: () => void;
  shouldBeCached: boolean;
  isVideoLiked?: boolean;
}
