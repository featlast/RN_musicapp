import { Music } from '../../core/models/music.model';
import { generateId } from '../../helpers';
import { Track } from '../interfaces/geo-top-tracks.response';

export class MusicMapper {
  static fromMusicDBResolveToModels(result: Track): Music {
    return {
      id:generateId(),
      name: result.name,
      duration: result.duration,
      listeners: result.listeners,
      mbid:result.mbid,
      url: result.url,
      artist:result.artist,
      image:result.image
    };
  }
}
