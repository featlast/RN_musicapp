import ApiManager from './apimanager';
import {API_KEY} from '@env';

//get MusictopTracks
export const getTopTracks = async (page: number = 1) => {
  try {
    const {data} = await ApiManager('', {
      params: {
        method: 'geo.gettoptracks',
        country: 'spain',
        api_key: API_KEY,
        format: 'json',
        page,
        limit: 50,
      },
    });
    return data;
  } catch (error) {
    throw new Error(`Erro en F getTopTracks: ${error}`);
  }
};

//get Detail Music Artist
export const getTrackInfo = async (mbid: string) => {
  try {
    const {data} = await ApiManager('', {
      params: {
        method: 'track.getInfo',
        api_key: API_KEY,
        mbid: mbid,
        format: 'json',
      },
    });
    return data;
  } catch (error) {
    throw new Error(`Error Feching F getTrackInfo ${error}`);
  }
};
