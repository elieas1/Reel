/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useContext, useState} from 'react';
import HomeScreen from './src/screens/homeScreen/HomeScreen';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Dimensions, View} from 'react-native';

const Context = React.createContext(0);

function App(): React.JSX.Element {
  const [appHeight, setAppHeight] = useState(Dimensions.get('window').height);
  return (
    <Provider store={store}>
      <Context.Provider value={appHeight}>
        <SafeAreaProvider>
          <View
            style={{flex: 1}}
            onLayout={e => setAppHeight(e.nativeEvent.layout.height)}>
            <HomeScreen />
          </View>
        </SafeAreaProvider>
      </Context.Provider>
    </Provider>
  );
}

// workaround since device height is calculated wrong on android simulator
export function useActualHeight() {
  return useContext(Context);
}

export default App;
