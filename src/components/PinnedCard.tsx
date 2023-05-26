import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';

// icons
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {News} from '../types';
import {fonts} from '../theme';
import {useNavigation} from '@react-navigation/native';

const PinnedCard = ({item, onPress}: {item: News; onPress: () => void}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        //@ts-ignore
        navigation.navigate('Detail', {item});
      }}
      style={styles.container}>
      <FastImage
        source={{uri: item.image_url}}
        resizeMode="cover"
        style={{width: '100%', height: '100%', borderRadius: 5}}
      />
      <Pressable
        onPress={onPress}
        style={{
          position: 'absolute',
          right: 2,
          backgroundColor: 'red',
          borderRadius: 100,
          top: 2,
        }}>
        <Feather name="x" size={8} color="white" />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 20,
    width: 50,
    height: 50,
    margin: 5,
    backgroundColor: '#F5F5F580',
  },
  text: {
    fontFamily: fonts.regular,
  },
});

export default PinnedCard;
