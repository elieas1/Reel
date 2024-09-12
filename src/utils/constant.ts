import {Dimensions} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const initialUrl = 'https://mocki.io/v1/e516925f-8d30-42d5-a5ae-7a36d4d21a10';

export {deviceHeight, deviceWidth, initialUrl};
