import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Favorite} from '../../../redux/feature/favoriteSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hook/hookRedux';
import {getFavorites, removeFromFavorites} from '../../../redux/utils/favoriteUtils';
import Loader from '../../components/Loader';
import {colors} from '../../../theme/colors';
import Toast from 'react-native-toast-message';

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
          <Text style={{color: colors.ui.darkBlue}}>No hay Archivos Almacenados</Text>
        )}
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
      Toast.show({
        type: 'success',
        text1: 'Canción Borrada',
        text2: 'Correctamente ✌️',
      });
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Error Al Eliminar',
        text2: '⚠️',
      });
    }
  };

  return (
    <View>
      <Text>{JSON.stringify(item)}</Text>
      <Text>{JSON.stringify(item.mbid)}</Text>
      <Button
        title="Delete"
        onPress={() => {
          handleActionOnPress();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
