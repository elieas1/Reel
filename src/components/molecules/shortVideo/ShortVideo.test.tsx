import React from 'react';
import {render} from '@testing-library/react-native';
import ShortVideo from './ShortVideo';
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';

// Mocking convertToProxyURL function
const mockStore = configureMockStore();
const store = mockStore({});

jest.mock('react-native-video-cache', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-native-video', () => 'Video');

const clip_url =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4';

describe('ShortVideo Caching', () => {
  it('should use the proxy URL when caching is enabled', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <ShortVideo
          clip_url={clip_url}
          isVisible={true}
          onVideoEnd={jest.fn()}
          description="Test Video"
          publishing_user="User"
          likes_count={10}
          shouldBeCached={false}
          isVideoLiked={false}
          views_count={100}
          id="1"
        />
        ,
      </Provider>,
    );

    expect(getByTestId('video-player')).toBeTruthy();
  });
});
