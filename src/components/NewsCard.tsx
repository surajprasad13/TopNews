import React, {useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  Pressable,
  View,
} from 'react-native';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// icons
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {News} from '../types';
import {colors, fonts} from '../theme';
import {useAppDispatch} from '../hooks';
import {addPinned} from '../redux/reducers/newsSlice';
import {useNavigation} from '@react-navigation/native';

const renderRightActions = (dispatch, item, ref) => {
  return (
    <RectButton
      style={styles.rightAction}
      onPress={() => {
        dispatch(addPinned(item));
        ref.current.close();
      }}>
      <Animated.View style={[styles.actionText]}>
        <Feather name="bookmark" size={20} />
      </Animated.View>
    </RectButton>
  );
};

const NewsCard = ({item}: {item: News}) => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const ref = useRef();
  const opacityValue = new Animated.Value(0);

  useEffect(() => {
    // Animate the opacity when the list data changes
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [item]);

  const animatedStyle = {
    opacity: opacityValue,
    margin: 10,
    borderRadius: 10,
    transform: [
      {
        translateX: opacityValue.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0], // Move from left to right
        }),
      },
    ],
  };

  return (
    <Animated.View style={animatedStyle}>
      <Swipeable
        //@ts-ignore
        ref={ref}
        renderRightActions={() => renderRightActions(dispatch, item, ref)}>
        <Pressable
          onPress={() => {
            //@ts-ignore
            navigation.navigate('Detail', {item});
          }}>
          <ImageBackground
            source={{uri: item.image_url, cache: 'reload'}}
            imageStyle={{borderRadius: 10}}
            style={{borderRadius: 10, minHeight: 150}}>
            <LinearGradient
              colors={['#62626259', '#000000']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              style={styles.container}>
              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.date}>
                {moment(item.published_at).format('lll')}
              </Text>
            </LinearGradient>
          </ImageBackground>
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.medium,
    color: colors.white,
  },
  date: {
    fontFamily: fonts.regular,
    color: colors.white,
    textAlign: 'right',
  },
  rightAction: {
    justifyContent: 'center',
    flex: 0.3,
    margin: 5,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
  },
  actionText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsCard;
