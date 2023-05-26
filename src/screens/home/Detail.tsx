import React from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import WebView from 'react-native-webview';

const Detail = ({route}: any) => {
  const {item} = route.params;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <WebView
        source={{uri: item.url}}
        style={{flex: 1, backgroundColor: 'white'}}
        startInLoadingState={true}
        decelerationRate="fast"
        renderLoading={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <ActivityIndicator />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Detail;
