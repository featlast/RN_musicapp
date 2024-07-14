import { ArtistMusic } from '../../core/models/artist.music.models';
import { Music } from '../../core/models/music.model';
import { generateId } from '../../helpers';
import { Track as TrackMusic } from '../interfaces/geo-top-tracks.response';
import { Track as TrackArtist } from '../interfaces/track-getinfo.response';


export class MusicMapper {
  static fromMusicDBResolveToModels(result: TrackMusic): Music {
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

export class ArtisMusicMapper{
  static fromArtisMusicDBResolveToModels(result: TrackArtist):ArtistMusic{
    return{
      id:generateId(),
      name:result.name,
      listeners:result.listeners,
      playcount:result.playcount,
      duration:result.duration,
      url:result.url,
      wiki:result.wiki,
      artist:result.artist,
      album:result.album
    };
  }
}
