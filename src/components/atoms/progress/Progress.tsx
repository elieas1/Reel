import {View, Animated} from 'react-native';
import React from 'react';
import styles from './Progress.styles';

type Props = {
  progress: Animated.Value;
};

const Progress = ({progress}: Props) => {
  return (
    <View testID="progress-slider" style={styles.sliderProgressView}>
      <Animated.View
        testID="progress-bar"
        style={[
          styles.progressView,
          {
            width: progress.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
};

export default Progress;
