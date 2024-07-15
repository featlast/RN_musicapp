import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParams} from '../../../routes/stack/MyStackNavigationScreens';
import {useGetInfoArtist} from '../../../hook/useGetInfoArtist';
import {colors} from '../../../theme/colors';
import Loader from '../../components/Loader';

const DetailScreen: React.FC = () => {
  const {mbid} = useRoute<RouteProp<RootStackParams, 'Detail'>>().params;
  const {data, isLoading, isError, error} = useGetInfoArtist(mbid);

  if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.ui.white,
        }}>
        <Loader />
      </View>
    );
  if (isError) return <Text>Error: {error?.message}</Text>;
  if (!data) return null;

  return (
    <View style={{flex: 1}}>
      <Text style={{color: colors.ui.darkBlue}}>{data.name}</Text>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
