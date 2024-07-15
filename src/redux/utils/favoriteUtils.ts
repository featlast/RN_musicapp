import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '../store';
import { addFavorite, Favorite, removeFavorite, setFavorites } from '../feature/favoriteSlice';

export const addToFavorites = async (data: Favorite, dispatch: AppDispatch) => {
  try {
    // Primero, despachamos la acción para una actualización inmediata de la UI
    dispatch(addFavorite(data));

    // Luego, actualizamos AsyncStorage
    const currentFavorites = await AsyncStorage.getItem('favorites');
    let favorites: Favorite[] = currentFavorites ? JSON.parse(currentFavorites) : [];
    
    if (favorites.length >= 3) {
      console.log('Límite de favoritos alcanzado. Elimina alguno para añadir más.');
      dispatch(removeFavorite(data.mbid));
      return false;
    }
    
    favorites.push(data);
    
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    
    console.log('Favorito añadido con éxito');
    return true;
  } catch (error) {
    console.log('Error añadiendo a favoritos:', error);
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
    console.log('Error obteniendo favoritos:', error);
    dispatch(setFavorites([]));
  }
};

// export const removeFromFavorites = async (mbid: string, dispatch: AppDispatch) => {
//   try {
//     dispatch(removeFavorite(mbid));
//     const currentFavorites = await AsyncStorage.getItem('favorites');
//     if (currentFavorites) {
//       let favorites: Favorite[] = JSON.parse(currentFavorites);
//       favorites = favorites.filter(fav => fav.mbid !== mbid);
//       await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
//     }
    
//     console.log('Favorito eliminado con éxito', mbid);
//   } catch (error) {
//     console.log('Error eliminando de favoritos:', error);
//   }
// };

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
      
      console.log('Favorito eliminado con éxito', mbid);
    } else {
      console.log('No se encontraron favoritos');
    }
  } catch (error) {
    console.error('Error eliminando de favoritos:', error);
  }
};
