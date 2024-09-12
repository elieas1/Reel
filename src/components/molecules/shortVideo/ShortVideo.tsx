import React, {useEffect, useRef, useState} from 'react';
import Video, {VideoRef} from 'react-native-video';
import styles from './ShortVideo.styles';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  Share,
  Text,
  View,
} from 'react-native';
import {ShortVideoTypes} from './ShortVideo.types';
import LinearGradient from 'react-native-linear-gradient';
import VideoActions from '../videoActions/VideoActions';
import Icon from 'react-native-vector-icons/AntDesign';
import convertToProxyURL from 'react-native-video-cache';
import {ActionProp} from '../../atoms/action/Action.types';
import {useDispatch} from 'react-redux';
import {likeVideo} from '../../../store/videos/videosSlice';
import Progress from '../../atoms/progress/Progress';
import AnimatedHeart from '../../atoms/animatedHeart/AnimatedHeart';
import {useActualHeight} from '../../../../App';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

type HeartAnimationHandle = {
  animate: () => void;
};

const ShortVideo = ({
  clip_url,
  isVisible,
  onVideoEnd,
  description,
  publishing_user,
  likes_count,
  shouldBeCached,
  isVideoLiked,
  views_count,
  shouldLoad,
  id,
}: ShortVideoTypes) => {
  const videoRef = useRef<VideoRef>(null);
  const [isVideoPaused, setVideoPaused] = useState(false);
  const [isVideoLoading, setVideoLoading] = useState(false);

  const deviceHeight = useActualHeight();

  const centerHeartRef = useRef<HeartAnimationHandle>();

  useEffect(() => {
    if (isVisible) {
      videoRef.current?.seek(0);
    }
  }, [isVisible]);

  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  const lastTap = useRef<number | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handlePress = () => {
    if (isVideoLoading) {
      return;
    }
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 200) {
      // Double-tap detected
      clearTimeout(timeout.current!);
      handleLike(false);
      centerHeartRef.current?.animate();
    } else {
      // Single-tap detected
      lastTap.current = now;
      timeout.current = setTimeout(() => {
        onVideoClick();
      }, 200);
    }
  };

  const dispatch = useDispatch();
  const renderLoader = (
    <View style={[styles.loader, {height: deviceHeight}]}>
      <ActivityIndicator size="large" />
    </View>
  );

  const onVideoClick = () => {
    setVideoPaused(prev => !prev);
    animateIcon();
  };

  const animateIcon = () => {
    opacityValue.setValue(1);
    // Reset the animation
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 4,
        duration: 300,
        useNativeDriver: true, // Native driver for performance
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset the values once the animation completes
      scaleValue.setValue(1);
      opacityValue.setValue(0);
    });
  };

  const videoUrl = shouldBeCached ? convertToProxyURL(clip_url) : clip_url;

  const handleLike = (canUnlike: boolean = true) => {
    if (isVideoLoading) {
      return;
    }
    dispatch(likeVideo({videoId: id!, canUnlike}));
  };

  const shareVideo = () => {
    Share.share({title: description, message: clip_url});
  };

  const actions: ActionProp[] = [
    {
      iconName: 'heart',
      count: likes_count!,
      onPress: handleLike,
      iconColor: isVideoLiked ? 'red' : 'white',
    },
    {
      iconName: 'eye',
      count: views_count!,
    },
    {
      iconName: 'sharealt',
      onPress: shareVideo,
    },
  ];

  const handleProgress = ({
    currentTime,
    seekableDuration,
  }: {
    currentTime: number;
    seekableDuration: number;
  }) => {
    progress.setValue((currentTime * 100) / seekableDuration);
  };

  const handleLoadStart = () => {
    setVideoLoading(true);
  };

  const handleLoad = () => {
    setVideoLoading(false);
  };

  return (
    <Pressable testID="video-player" onPress={handlePress}>
      <Video
        ref={videoRef}
        style={[styles.video, {height: deviceHeight}]}
        source={
          isVisible || shouldLoad ? {uri: videoUrl, type: 'mp4'} : undefined
        }
        // videos used are not ideal for short type videos,
        // all resize mode options will not work as a short should
        resizeMode="cover"
        onProgress={handleProgress}
        playInBackground={false}
        paused={!isVisible || isVideoPaused}
        onEnd={onVideoEnd}
        repeat={true}
        onLoadStart={handleLoadStart}
        onLoad={handleLoad}
        testID="video"
        renderLoader={renderLoader}
      />
      <Animated.View style={styles.pauseControl}>
        <AnimatedIcon
          name={isVideoPaused ? 'pausecircle' : 'play'}
          size={50}
          color="black"
          style={[
            styles.pause,
            {
              transform: [{scale: scaleValue}],
              opacity: opacityValue,
            },
          ]}
        />
      </Animated.View>
      <AnimatedHeart ref={centerHeartRef} />
      <View style={styles.videoActions}>
        <VideoActions actions={actions} />
      </View>
      <LinearGradient
        style={styles.linear}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['transparent', 'rgb(50,50,50)']}>
        <View style={styles.clipInfo}>
          <Text numberOfLines={1} style={styles.clipTitle}>
            {publishing_user}
          </Text>
          <Text numberOfLines={1} style={styles.clipTitle}>
            {description}
          </Text>
        </View>
      </LinearGradient>
      <Progress progress={progress} />
    </Pressable>
  );
};

export default ShortVideo;
