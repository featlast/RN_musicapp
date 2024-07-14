import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useTopTracks} from '../../hook/useTopTracks';
import {Music} from '../../core/models/music.model';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error} = useTopTracks();

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const TrackItem = React.memo(({item}: {item: Music}) => (
    <View>
      <Text style={{fontWeight: 'bold'}}>Nombre Canción: {item.name}</Text>
      <Text>Duración: {item.duration}</Text>
      <Text style={{fontFamily: 'Poppins'}}>Oyentes: {item.listeners}</Text>
      <Text style={{fontWeight: 'bold'}}>Artista: {item.artist.name}</Text>
      <Icon name="favorite-outline" size={26} color={'red'} />
    </View>
  ));

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (!hasNextPage) return null;
    return <ActivityIndicator style={{marginVertical: 20}} />;
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
    <FlashList
      data={allTracks}
      renderItem={({item}) => <TrackItem item={item} />}
      keyExtractor={item => item.id.toString()}
      onEndReached={loadMore}
      onEndReachedThreshold={0.7}
      ListFooterComponent={renderFooter}
      estimatedItemSize={300}
      drawDistance={250}
      // overrideItemLayout={overrideItemLayout}
    />
  );
};

export default HomeScreen;
