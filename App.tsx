/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import RootNavigator from './src/navigation/RootNavigation';
import store from './src/redux/store';

function App(): React.JSX.Element {
  return (
    <View style={styles.rootContainer}>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
