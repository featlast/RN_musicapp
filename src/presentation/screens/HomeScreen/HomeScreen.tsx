import React from 'react';
import {View, Text} from 'react-native';
import {useTopTracks} from '../../../hook/useTopTracks';
import {FlashList} from '@shopify/flash-list';
import TrackItem from './components/TrackItem';
import {colors} from '../../../theme/colors';
import Loader from '../../components/Loader';

const HomeScreen: React.FC = () => {
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error} = useTopTracks();

  if (isLoading) return <Loader />;
  if (error) return <Text>Error: {error.message}</Text>;

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (!hasNextPage) return null;
    return <Loader />;
  };

  const allTracks = data?.pages.flatMap(page => page.tracks) ?? [];

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

export default HomeScreen;
