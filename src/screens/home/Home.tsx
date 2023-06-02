import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  AppState,
  FlatList,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchNews} from '../../redux/actions/newsAction';
import {NewsCard, PinnedCard} from '../../components';
import {fonts} from '../../theme';
import {
  addOffset,
  deleteResults,
  updatePinned,
} from '../../redux/reducers/newsSlice';

const Home = ({}) => {
  const dispatch = useAppDispatch();
  const {results, loading, pinned, offset} = useAppSelector(
    state => state.news,
  );
  const offsetRef = useRef(offset);

  useEffect(() => {
    dispatch(fetchNews({limit: 10, skip: 0}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MINUTE_MS = 20 * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      offsetRef.current += 5;
      dispatch(fetchNews({limit: 5, offset: offsetRef.current}));
    }, MINUTE_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log(nextAppState);
      if (nextAppState == 'background' || nextAppState == 'inactive') {
        dispatch(deleteResults());
        dispatch(addOffset(offsetRef.current));
      }
    });

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item, index}: any) => (
    <NewsCard item={item} key={index.toString()} />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Search article here" style={styles.input} />
      </View>

      {pinned.length > 0 && (
        <Text style={{margin: 5, fontFamily: fonts.medium}}>Pinned</Text>
      )}

      <ScrollView horizontal style={{}}>
        {pinned.map((item, index) => {
          return (
            <PinnedCard
              key={index.toString()}
              item={item}
              onPress={() => {
                dispatch(updatePinned(item));
              }}
            />
          );
        })}
      </ScrollView>

      <FlatList
        data={results}
        removeClippedSubviews
        style={{marginTop: 10}}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />

      {loading && <ActivityIndicator />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F1FA',
    borderRadius: 100,
    margin: 5,
  },
  input: {
    padding: 15,
  },
});

export default Home;
