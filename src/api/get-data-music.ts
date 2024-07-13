import ApiManager from "./apimanager";
import { API_KEY } from "@env";

export const getTopTracks = async (page = 1) => {
  const { data } = await ApiManager('', {
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
};
