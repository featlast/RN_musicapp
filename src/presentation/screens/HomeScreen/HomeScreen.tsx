import React from 'react';
import {View, Text} from 'react-native';
import {useTopTracks} from '../../../hook/useTopTracks';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import LoaderKit from 'react-native-loader-kit';
import TrackItem from './components/TrackItem';
import {colors} from '../../../theme/colors';

const HomeScreen = () => {
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error} = useTopTracks();

  if (isLoading)
    return (
      <LoaderKit
        style={{width: 50, height: 50, alignSelf: 'center'}}
        name={'BallPulseSync'}
        color={'red'}
      />
    );
  if (error) return <Text>Error: {error.message}</Text>;

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (!hasNextPage) return null;
    return (
      <LoaderKit
        style={{width: 50, height: 50, alignSelf: 'center'}}
        name={'BallPulseSync'}
        color={'red'}
      />
    );
    // <ActivityIndicator style={{marginVertical: 20}} />;
  };

  const allTracks = data?.pages.flatMap(page => page.tracks) ?? [];

  const ITEM_HEIGHT = 87;
  //Render Item Optimize
  // const overrideItemLayout = React.useCallback(
  //   (
  //     layout: {span?: number; size?: number},
  //     item: Music,
  //     index: number,
  //     maxColumns: number,
  //     extraData?: any,
  //   ) => {
  //     if (layout.size !== undefined) {
  //       layout.size = ITEM_HEIGHT;
  //     }
  //   },
  //   [data],
  // );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.ui.white,
      }}>
      <FlashList
        data={allTracks}
        renderItem={({item}) => <TrackItem item={item} />}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.7}
        ListFooterComponent={renderFooter}
        estimatedItemSize={300}
        drawDistance={250}
      />
    </View>
  );
};
// overrideItemLayout={overrideItemLayout}

export default HomeScreen;
