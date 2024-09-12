import React from 'react';
import Action from './Action';
import {render, fireEvent} from '@testing-library/react-native';
import {Animated} from 'react-native';

describe('Action Component', () => {
  const onPressMock = jest.fn();

  const defaultProps = {
    iconName: 'heart',
    iconColor: 'white',
    textColor: 'white',
    count: 10,
    onPress: onPressMock,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const {getByText} = render(<Action {...defaultProps} />);

    const text = getByText('10');

    expect(text).toBeTruthy();
  });

  it('calls onPress when the button is pressed', () => {
    const {getByTestId} = render(<Action {...defaultProps} />);

    const iconPressable = getByTestId('ActionPressable');
    fireEvent.press(iconPressable);

    // Check if onPress was called
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('animates heart on press', () => {
    const spyAnimate = jest.spyOn(Animated, 'sequence');

    const {getByTestId} = render(<Action {...defaultProps} />);

    const iconPressable = getByTestId('ActionPressable');
    fireEvent.press(iconPressable);

    expect(spyAnimate).toHaveBeenCalledTimes(1);
  });

  it('renders without crashing when no count is provided', () => {
    const {queryByText} = render(
      <Action {...defaultProps} count={undefined} />,
    );

    // Ensure no count text is rendered
    expect(queryByText('10')).toBeNull();
  });
});
