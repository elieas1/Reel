import React from 'react';
import {act, render} from '@testing-library/react-native';
import AnimatedHeart from './AnimatedHeart';
import {Animated} from 'react-native';

describe('AnimatedHeart', () => {
  it('should render the heart icon correctly', () => {
    const {getByTestId} = render(<AnimatedHeart />);
    const heartIcon = getByTestId('Animated-heart');
    expect(heartIcon).toBeTruthy();
  });

  it('should animate the heart with correct values', () => {
    const ref = React.createRef<any>();
    render(<AnimatedHeart ref={ref} />);

    const spyAnimate = jest.spyOn(Animated, 'parallel');
    const spyTiming = jest.spyOn(Animated, 'timing');

    // Trigger animation
    act(() => {
      ref.current.animate();
    });

    expect(spyAnimate).toHaveBeenCalledTimes(1);
    expect(spyTiming).toHaveBeenCalledTimes(1);
  });
});
