import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Music} from '../../../../core/models/music.model';
import Icon from 'react-native-vector-icons/MaterialIcons';
import format from 'human-format';
import {colors} from '../../../../theme/colors';

const TrackItem = React.memo(({item}: {item: Music}) => {
  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const imageUrl = item.image[2]['#text'];
  return (
    <TouchableOpacity
      activeOpacity={0.99}
      onPress={() => console.log('contaner')}
      style={{overflow: 'hidden'}}>
      <View
        style={{
          justifyContent: 'center',
          backgroundColor: colors.ui.primary,
          width: '98%',
          height: 130,
          padding: 10,
          marginBottom: 10,
          alignSelf: 'center',
          borderRadius: 10,
          shadowColor: '#000F', // Agrega una sombra
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
          name="touch-app"
          size={15}
          color={colors.ui.quaternary}
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
          <Icon
            name="favorite-outline"
            size={26}
            color={colors.ui.quaternary}
            style={{position: 'absolute', right: 15, top: 8}}
            onPress={() => console.log('press fav')}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              right: 15,
              bottom: 8,
            }}>
            <Icon name="audiotrack" size={20} color={colors.ui.quaternary} />
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
