import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface Favorite {
  artist: {
    mbid: string;
    name: string;
    url: string;
  };
  duration: string;
  id: string;
  image: Array<{
    '#text': string;
    size: string;
  }>;
  listeners: string;
  mbid: string;
  name: string;
  url: string;
}

export interface FavoritesState {
  items: Favorite[];
}


const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // addFavorite: (state, action: PayloadAction<Favorite>) => {
    //   state.items.push(action.payload);
    // },
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      if (state.items.length < 10) {
        state.items.push(action.payload);
      }
    },
    setFavorites: (state, action: PayloadAction<Favorite[]>) => {
      state.items = action.payload;
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.mbid !== action.payload);
    },
  },
});

export const { addFavorite, setFavorites, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
