import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './src/reducers';
import middleware from './src/middleware';
import AppNavigator from './src/navigation/navigator';
import { setLocalNotification } from './src/services/helper';

const store = createStore(reducer, middleware);

class App extends React.Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
