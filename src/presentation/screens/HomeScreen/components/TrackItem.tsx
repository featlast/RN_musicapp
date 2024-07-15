import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import format from 'human-format';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {colors} from '../../../../theme/colors';
import {Music} from '../../../../core/models/music.model';
import {RootStackParams} from '../../../../routes/stack/MyStackNavigationScreens';
import Icon, {Icons} from '../../../components/IconComponent';
import {addToFavorites, removeFromFavorites} from '../../../../redux/utils/favoriteUtils';
import {useAppDispatch, useAppSelector} from '../../../../redux/hook/hookRedux';
import {formatDuration} from '../../../../helpers';

const TrackItem = React.memo(({item}: {item: Music}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const imageUrl = item.image[2]['#text'];

  const favorites = useAppSelector(state => state.favorites.items);
  const isFavorite = favorites.some(fav => fav.mbid === item.mbid);

  const handleToggleFavorite = async () => {
    if (isFavorite) {
      await removeFromFavorites(item.mbid, dispatch);
    } else {
      const added = await addToFavorites(item, dispatch);
      if (!added) {
        console.log('No se puede añadir más favoritos. Límite alcanzado.');
      }
    }
  };

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
          <View style={{padding: 10, flex: 0.9}}>
            <Text
              style={{fontWeight: 'bold', fontFamily: 'Poppins', color: colors.ui.white}}
              ellipsizeMode="tail"
              numberOfLines={2}>
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
            disabled={isFavorite}
            onPress={handleToggleFavorite}
            style={{position: 'absolute', right: 15, top: 8}}
            hitSlop={30}>
            <Icon
              type={Icons.MaterialIcons}
              name={isFavorite ? 'favorite' : 'favorite-outline'}
              size={20}
              color={isFavorite ? colors.ui.white : colors.ui.fucsia}
            />
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
