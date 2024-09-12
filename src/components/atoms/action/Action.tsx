import {View, Text, Pressable, Animated} from 'react-native';
import React, {useRef} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {ActionProp} from './Action.types';
import styles from './Action.styles';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const Action = ({
  iconName,
  iconColor = 'white',
  textColor = 'white',
  count,
  onPress,
}: ActionProp) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (!onPress) {
      return;
    }
    onPress();
    animateHeart();
  };

  const animateHeart = () => {
    // Scale up to 1.5x size
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.5, // Scale up to 1.5x size
        duration: 300, // Duration for scaling up
        useNativeDriver: true, // Native driver for performance
      }),
      // Scale back to original size
      Animated.timing(scaleValue, {
        toValue: 1, // Scale back to normal
        duration: 300, // Duration for scaling down
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <View style={styles.wrapper}>
      <Pressable testID="ActionPressable" onPress={handlePress}>
        <AnimatedIcon
          style={{transform: [{scale: scaleValue}]}}
          name={iconName}
          size={35}
          color={iconColor}
        />
      </Pressable>
      {count && <Text style={[styles.text, {color: textColor}]}>{count}</Text>}
    </View>
  );
};

export default Action;
