import { Music } from '../../core/models/music.model';
import { Track } from '../interfaces/geo-top-tracks.response';

export class MusicMapper {
  static fromMusicDBResolveToModels(result: Track): Music {
    return {
      name: result.name,
      duration: result.duration,
      listeners: result.listeners,
      url: result.url,
      mbid: result.mbid ,
    };
  }
}
