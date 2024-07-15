import {Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Favorite} from '../../../redux/feature/favoriteSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hook/hookRedux';
import {getFavorites, removeFromFavorites} from '../../../redux/utils/favoriteUtils';
import Loader from '../../components/Loader';
import {colors} from '../../../theme/colors';
import Toast from 'react-native-toast-message';
import Icon, {Icons} from '../../components/IconComponent';
import {formatDuration} from '../../../helpers';
import format from 'human-format';
import {ListHeader} from './components/ListHeader';

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);

  if (!favorites)
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

  React.useEffect(() => {
    getFavorites(dispatch);
  }, [dispatch]);

  return (
    <>
      <FlatList
        data={favorites}
        renderItem={({item}) => <TrackItemStorage item={item} />}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => (
          <Text
            style={{
              color: colors.ui.darkBlue,
              textAlign: 'center',
              fontFamily: 'Poppins',
              fontSize: 20,
            }}>
            No hay Archivos Almacenados
          </Text>
        )}
        ListHeaderComponent={ListHeader}
      />
    </>
  );
};

export default ProfileScreen;

const TrackItemStorage = ({item}: {item: Favorite}) => {
  const dispatch = useAppDispatch();

  const handleActionOnPress = async () => {
    try {
      await removeFromFavorites(item.mbid, dispatch);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error eliminando de favoritos En Handle',
        text2: '⚠️',
      });
    }
  };

  const imageUrl = item.image[2]['#text'];

  return (
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
          onPress={handleActionOnPress}
          style={{position: 'absolute', right: 15, top: 8}}
          hitSlop={30}>
          <Icon type={Icons.MaterialIcons} name={'delete'} size={20} />
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
  );
};

const styles = StyleSheet.create({});
