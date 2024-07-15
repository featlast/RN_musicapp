import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '../store';
import { addFavorite, Favorite, removeFavorite, setFavorites } from '../feature/favoriteSlice';
import Toast from 'react-native-toast-message';

export const addToFavorites = async (data: Favorite, dispatch: AppDispatch) => {
  try {

    // Primero, despachamos la acción para una actualización inmediata de la UI
    dispatch(addFavorite(data));

    // Luego, actualizamos AsyncStorage
    const currentFavorites = await AsyncStorage.getItem('favorites');
    let favorites: Favorite[] = currentFavorites ? JSON.parse(currentFavorites) : [];
    
    if (favorites.length >=10) {
      Toast.show({
        type: 'success',
        text1: 'Límite de favoritos alcanzado',
        text2: ' 🚫',
      });
      // console.log('Límite de favoritos alcanzado. Elimina alguno para añadir más.');
      dispatch(removeFavorite(data.mbid));
      return false;
    }
    
    favorites.push(data);
    
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    Toast.show({
      type: 'success',
      text1: 'Favorito añadido con éxito',
      text2: 'Correctamente ✌️',
    });
    // console.log('Favorito añadido con éxito');
    return true;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error Al Eliminar',
      text2: '⚠️',
    });
    // console.log('Error añadiendo a favoritos:', error);
    // Revertimos el estado en caso de error
    dispatch(removeFavorite(data.mbid));
    return false;
  }
};

export const getFavorites = async (dispatch: AppDispatch): Promise<void> => {
  try {
    const favoritesJson = await AsyncStorage.getItem('favorites');
    const favorites: Favorite[] = favoritesJson ? JSON.parse(favoritesJson) : [];
    dispatch(setFavorites(favorites));
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error obteniendo favoritos',
      text2: '⚠️',
    });
    // console.log('Error obteniendo favoritos:', error);
    dispatch(setFavorites([]));
  }
};


export const removeFromFavorites = async (mbid: string, dispatch: AppDispatch) => {
  try {
    // Primero, obtenemos los favoritos actuales
    const currentFavoritesString = await AsyncStorage.getItem('favorites');
    if (currentFavoritesString) {
      let favorites: Favorite[] = JSON.parse(currentFavoritesString);
      
      // Filtramos el favorito que queremos eliminar
      favorites = favorites.filter(fav => fav.mbid !== mbid);
      
      // Guardamos los favoritos actualizados en AsyncStorage
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      
      // Dispatch de la acción para actualizar el estado de Redux
      dispatch(removeFavorite(mbid));
      Toast.show({
        type: 'success',
        text1: 'Favorito eliminado con éxito',
        text2: ' ✌️',
      });
      // console.log('Favorito eliminado con éxito', mbid);
    } else {
      Toast.show({
        type: 'error',
        text1: 'No se encontraron favoritos',
        text2: '⚠️',
      });
      // console.log('No se encontraron favoritos');
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error eliminando de favoritos',
      text2: '⚠️',
    });
    // console.error('Error eliminando de favoritos:', error);
  }
};
