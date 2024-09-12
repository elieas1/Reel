import {View} from 'react-native';
import React from 'react';
import Action from '../../atoms/action/Action';
import styles from './VideoActions.styles';
import {VideoActionsProps} from './VideoActions.types';

const VideoActions = ({actions}: VideoActionsProps) => {
  const renderedActions = actions?.map((action, index) => {
    const {count, iconColor, iconName, onPress, textColor} = action ?? {};
    return (
      <Action
        key={index}
        count={count}
        iconColor={iconColor}
        iconName={iconName}
        onPress={onPress}
        textColor={textColor}
      />
    );
  });

  return <View style={styles.wrapper}>{renderedActions}</View>;
};

export default VideoActions;
