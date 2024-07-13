import ApiManager from "./apimanager";

//getTopTracks
// export const getTopTracks = async () => {
//   try {
//     const {data} = await ApiManager('', {
//       method: 'GET',
//         params:{
//           method:'geo.gettoptracks',
//           country:'spain',
//           api_key:'c19c47264b0dfd0973d63aa54cb6788c',
//           format: 'json'
//         },
//     });
//     return data;
//   } catch (error: unknown) {
//     throw new Error (`Error en el fetching Data => ${error}`)
//   }
// };

export const getTopTracks = async (page = 1) => {
  const { data } = await ApiManager('', {
    params: {
      method: 'geo.gettoptracks',
      country: 'spain',
      api_key: 'c19c47264b0dfd0973d63aa54cb6788c',
      format: 'json',
      page,
      limit: 10, 
    },
  });
  return data;
};
