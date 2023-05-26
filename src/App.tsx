import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

//
import AppNavigator from './routes/AppNavigator';
import store, {persistor} from './redux';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Set the duration as per your preference
  }, []);

  return (
    <>
      {showSplash ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <FastImage
            source={require('./assets/images/logo.png')}
            style={{width: 100, height: 100}}
          />
        </View>
      ) : (
        <SafeAreaProvider>
          <PersistGate persistor={persistor} loading={<Text>Loading...</Text>}>
            <Provider store={store}>
              <AppNavigator />
            </Provider>
          </PersistGate>
        </SafeAreaProvider>
      )}
    </>
  );
};

export default App;
