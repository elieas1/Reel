import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import VideoActions from './VideoActions';
import {VideoActionsProps} from './VideoActions.types';

describe('VideoActions Component', () => {
  const mockActions: VideoActionsProps['actions'] = [
    {
      count: 10,
      iconColor: 'red',
      iconName: 'heart',
      onPress: jest.fn(),
      textColor: 'white',
    },
    {
      count: 100,
      iconColor: 'blue',
      iconName: 'share',
      onPress: jest.fn(),
      textColor: 'black',
    },
  ];

  it('should render the correct number of Action components', () => {
    const {getAllByTestId} = render(<VideoActions actions={mockActions} />);

    // Expect two Action components to be rendered
    const actionComponents = getAllByTestId('ActionPressable');
    expect(actionComponents.length).toBe(2);
  });

  it('should pass correct props to each Action component', () => {
    const {getByText} = render(<VideoActions actions={mockActions} />);

    const actionComponentOne = getByText('10');
    const actionComponentTwo = getByText('100');
    expect(actionComponentOne).toBeTruthy();
    expect(actionComponentTwo).toBeTruthy();
  });

  it('should call the onPress function when an action is pressed', () => {
    const {getAllByTestId} = render(<VideoActions actions={mockActions} />);

    const actionComponents = getAllByTestId('ActionPressable');

    // Simulate press event on the first Action component
    fireEvent.press(actionComponents[0]);

    // Ensure the onPress function was called
    expect(mockActions[0].onPress).toHaveBeenCalled();
  });
});
