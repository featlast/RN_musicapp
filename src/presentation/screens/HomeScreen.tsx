// import {FlatList, StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import {useQuery} from '@tanstack/react-query';
// import {getTopTracks} from '../../api/get-data-music';
// import {useTopTracks} from '../../hook/useTopTracks';
// import {Music} from '../../core/models/music.model';

// const HomeScreen = () => {
//   const {data: tracks, isLoading, error} = useTopTracks();

//   if (isLoading) return <Text>Cargando...</Text>;
//   if (error) return <Text>Error: {(error as Error).message}</Text>;
//   const renderTrack = ({item}: {item: Music}) => (
//     <View>
//       <Text>Nombre Artista: {item.name}</Text>
//       <Text>Duración: {item.duration}</Text>
//       <Text>Oyentes: {item.listeners}</Text>
//     </View>
//   );

//   return (
//     <View>
//       <FlatList data={tracks} keyExtractor={item => item.url} renderItem={renderTrack} />
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});

// src/screens/TopTracks.tsx
import React from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {useTopTracks} from '../../hook/useTopTracks';
import {Music} from '../../core/models/music.model';

const HomeScreen = () => {
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error} = useTopTracks();

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const renderTrack = ({item}: {item: Music}) => (
    <View>
      <Text>{item.name}</Text>
      <Text>Duración: {item.duration}</Text>
      <Text>Oyentes: {item.listeners}</Text>
    </View>
  );

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
    <FlatList
      data={allTracks}
      renderItem={renderTrack}
      keyExtractor={item => item.mbid.toString()}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

export default HomeScreen;
