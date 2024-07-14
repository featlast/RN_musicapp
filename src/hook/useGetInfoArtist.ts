import { useQuery } from '@tanstack/react-query';
import { ArtistMusic } from '../core/models/artist.music.models';
import { getTrackInfo } from '../api/get-data-music';
import { ArtisMusicMapper } from '../infrastructure/mappers/music.mapper';

export const useGetInfoArtist = (mbid: string) => {
  return useQuery<ArtistMusic, Error>({
    queryKey: ['artistInfo', mbid],
    queryFn: async () => {
      const response = await getTrackInfo(mbid);
      return ArtisMusicMapper.fromArtisMusicDBResolveToModels(response.track);
    },
    enabled: !!mbid,
  });
};
