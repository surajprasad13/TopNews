import React from 'react';
import {SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';

const Detail = ({route}: any) => {
  const {item} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView source={{uri: item.url}} style={{flex: 1}} />
    </SafeAreaView>
  );
};

export default Detail;
