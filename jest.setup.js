import 'jest';

jest.mock('react-native-vector-icons', () => {
  return {
    createIconSet: jest.fn(),
  };
});
