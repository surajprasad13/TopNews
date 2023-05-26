import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './routes/AppNavigator';
import {Provider} from 'react-redux';
import store, {persistor} from './redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Text} from 'react-native';

const App = () => {
  return (
    <SafeAreaProvider>
      <PersistGate persistor={persistor} loading={<Text>Loading...</Text>}>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </PersistGate>
    </SafeAreaProvider>
  );
};

export default App;
