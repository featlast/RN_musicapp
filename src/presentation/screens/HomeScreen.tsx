import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useTopTracks} from '../../hook/useTopTracks';
import {Music} from '../../core/models/music.model';
import {FlashList} from '@shopify/flash-list';

const HomeScreen = () => {
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error} = useTopTracks();

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const TrackItem = React.memo(({item}: {item: Music}) => (
    <View>
      <Text>Nombre Canción: {item.name}</Text>
      <Text>Duración: {item.duration}</Text>
      <Text>Oyentes: {item.listeners}</Text>
      <Text>Artista: {item.artist.name}</Text>
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

  return (
    <FlashList
      data={allTracks}
      renderItem={({item}) => <TrackItem item={item} />}
      keyExtractor={item => item.id.toString()}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      estimatedItemSize={200}
    />
  );
};

export default HomeScreen;
