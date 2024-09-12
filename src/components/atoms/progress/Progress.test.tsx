import React from 'react';
import {render} from '@testing-library/react-native';
import {Animated} from 'react-native';
import Progress from './Progress';

describe('Progress', () => {
  it('should render the progress component', () => {
    const progress = new Animated.Value(50);

    const {getByTestId} = render(<Progress progress={progress} />);

    // Ensure the outer view is rendered
    const outerView = getByTestId('progress-slider');
    expect(outerView).toBeTruthy();

    // Ensure the inner animated view is rendered
    const animatedView = getByTestId('progress-bar');
    expect(animatedView).toBeTruthy();
  });

  it('should interpolate the width correctly', () => {
    const progress = new Animated.Value(75);
    const interpolateSpy = jest.spyOn(progress, 'interpolate');

    render(<Progress progress={progress} />);

    expect(interpolateSpy).toHaveBeenCalledWith({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    });
  });
});
