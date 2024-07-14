import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParams} from '../../../routes/stack/MyStackNavigationScreens';

const DetailScreen: React.FC = () => {
  const {mbid} = useRoute<RouteProp<RootStackParams, 'Detail'>>().params;
  return (
    <View>
      <Text>{mbid}</Text>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
