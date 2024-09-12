import {Animated} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './AnimatedHeart.styles';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const AnimatedHeart = forwardRef((_, ref) => {
  const heartScaleValue = useRef(new Animated.Value(1)).current;
  const heartOpacityValue = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => {
    return {
      animate() {
        animateHeart();
      },
    };
  });

  const animateHeart = useCallback(() => {
    // Reset the initial values
    heartOpacityValue.setValue(1);

    // Animate the heart scaling
    Animated.parallel([
      Animated.timing(heartScaleValue, {
        toValue: 4,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Add delay before resetting the values
      Animated.sequence([
        Animated.delay(500),
        Animated.parallel([
          Animated.timing(heartScaleValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(heartOpacityValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });
  }, [heartOpacityValue, heartScaleValue]);

  return (
    <Animated.View testID="Animated-heart" style={styles.centerLike}>
      <AnimatedIcon
        name="heart"
        size={50}
        color="red"
        style={{
          transform: [{scale: heartScaleValue}],
          opacity: heartOpacityValue,
        }}
      />
    </Animated.View>
  );
});

export default AnimatedHeart;
