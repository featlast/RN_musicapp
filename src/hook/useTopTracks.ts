import { useInfiniteQuery } from '@tanstack/react-query';
import { MusicMapper } from '../infrastructure/mappers/music.mapper';
import { Music } from '../core/models/music.model';
import { getTopTracks } from '../api/get-data-music';

interface PageData {
  tracks: Music[];
  nextPage: number;
  totalPages: number;
}

export const useTopTracks = () => {
  return useInfiniteQuery<PageData, Error>({
    queryKey: ['tracks'],
    queryFn: async ({ pageParam }) => {
      const response = await getTopTracks(pageParam as number);
      return {
        tracks: response.tracks.track.map(MusicMapper.fromMusicDBResolveToModels),
        nextPage: parseInt(response.tracks['@attr'].page) + 1,
        totalPages: parseInt(response.tracks['@attr'].totalPages),
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => 
      lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
  });
};
