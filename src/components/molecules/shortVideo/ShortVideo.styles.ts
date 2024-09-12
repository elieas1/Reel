import {StyleSheet} from 'react-native';
import {deviceWidth} from '../../../utils/constant';

export default StyleSheet.create({
  video: {
    width: deviceWidth,
  },
  linear: {
    position: 'absolute',
    padding: 30,
    bottom: 0,
    width: '100%',
  },
  clipInfo: {
    gap: 10,
  },
  clipTitle: {
    fontSize: 20,
    color: 'white',
  },
  loader: {
    zIndex: 4,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  videoActions: {
    position: 'absolute',
    end: 0,
    height: '100%',
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 120,
  },
  pauseControl: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pause: {
    shadowColor: '#ffffff',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 40,
  },
});
