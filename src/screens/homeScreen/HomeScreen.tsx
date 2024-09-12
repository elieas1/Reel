import {ActivityIndicator, FlatList, View, ViewToken} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../store/store';
import {setVideos} from '../../store/videos/videosSlice';
import {initialUrl} from '../../utils/constant';
import ShortVideo from '../../components/molecules/shortVideo/ShortVideo';
import {VideoItem} from './HomeScreen.types';
import styles from './HomeScreen.styles';
import {StateVideo} from '../../store/videos/videosApi.types';
import {useLazyGetVideosQuery} from '../../store/videos/videosApi';

const viewabilityConfig = {
  itemVisiblePercentThreshold: 100, // Only count items as viewable if 50% of the item is visible
};

const HomeScreen = () => {
  const {videos, next_page} = useAppSelector(state => state.videos);
  const flatlistRef = useRef<FlatList<VideoItem>>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [fetchVideos, {isLoading}] = useLazyGetVideosQuery();

  const dispatch = useDispatch();

  const getVideos = useCallback(
    (url: string) => {
      fetchVideos(url)
        .then(fetchedData => dispatch(setVideos(fetchedData.data!)))
        .catch(() => {});
    },
    [dispatch, fetchVideos],
  );

  useEffect(() => {
    getVideos(initialUrl);
  }, [getVideos]);

  const getMoreVideos = () => {
    if (next_page) {
      getVideos(next_page);
    }
  };

  const renderVideo = ({item, index}: {item: StateVideo; index: number}) => {
    const {
      clip_url,
      publishing_user,
      description,
      id,
      likes_count,
      liked,
      views_count,
    } = item ?? {};

    const onVideoEnd = () => {
      if (currentIndex !== videos?.length - 1) {
        flatlistRef.current?.scrollToIndex({index: currentIndex + 1});
      }
    };

    return (
      <ShortVideo
        key={id}
        clip_url={clip_url}
        id={id}
        isVideoLiked={liked}
        isVisible={index === currentIndex}
        onVideoEnd={onVideoEnd}
        likes_count={likes_count}
        description={description}
        publishing_user={publishing_user}
        shouldBeCached={index < 4}
        views_count={views_count}
      />
    );
  };

  const handleChangedIndex = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<VideoItem>[];
  }) => {
    if (viewableItems.length === 1) {
      const viewableIndex = viewableItems[0].index;
      if (currentIndex !== viewableIndex) {
        setCurrentIndex(viewableIndex!);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatlistRef}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        data={videos}
        renderItem={renderVideo}
        bounces={false}
        onViewableItemsChanged={handleChangedIndex}
        onEndReached={getMoreVideos}
        initialNumToRender={2}
        removeClippedSubviews
        maxToRenderPerBatch={2}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};

export default HomeScreen;
