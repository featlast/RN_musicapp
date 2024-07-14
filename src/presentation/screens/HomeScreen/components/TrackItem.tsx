import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Music} from '../../../../core/models/music.model';
import format from 'human-format';
import {colors} from '../../../../theme/colors';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../../../routes/stack/MyStackNavigationScreens';
import Icon, {Icons} from '../../../components/IconComponent';

const TrackItem = React.memo(({item}: {item: Music}) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${minutes}:${formattedSeconds}`;
  }

  const imageUrl = item.image[2]['#text'];
  return (
    <TouchableOpacity
      activeOpacity={0.99}
      onPress={() => navigation.navigate('Detail', {mbid: item.mbid})}
      style={{overflow: 'hidden'}}>
      <View
        style={{
          justifyContent: 'center',
          backgroundColor: colors.ui.primary,
          width: '95%',
          height: 130,
          padding: 16,
          marginBottom: 8,
          alignSelf: 'center',
          borderRadius: 10,
          shadowColor: '#000F',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          overflow: 'hidden',
        }}>
        <Icon
          type={Icons.MaterialIcons}
          name="touch-app"
          size={15}
          style={{position: 'absolute', top: 10, left: 10}}
        />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: imageUrl}}
            style={{width: 70, height: 70, borderRadius: 20}}
            resizeMode="contain"
          />
          <View style={{padding: 10}}>
            <Text style={{fontWeight: 'bold', fontFamily: 'Poppins', color: colors.ui.white}}>
              {item.name}
            </Text>
            <Text style={{fontWeight: 'regular', fontFamily: 'Poppins', color: colors.ui.white}}>
              {formatDuration(Number(item.duration))}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'Poppins',
                color: colors.ui.white,
                paddingTop: 10,
              }}>
              {item.artist.name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => console.log('Add Fav')}
            style={{position: 'absolute', right: 15, top: 8}}>
            <Icon type={Icons.MaterialIcons} name="favorite-outline" size={20} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              right: 15,
              bottom: 8,
            }}>
            <Icon type={Icons.MaterialIcons} name="audiotrack" size={20} />
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'Poppins',
                color: colors.ui.white,
                paddingTop: 10,
              }}>
              {format(Number(item.listeners))}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default TrackItem;
