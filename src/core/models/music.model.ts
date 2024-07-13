export interface Music {
  id:string;
  name: string;
  url: string;
  duration: string;
  listeners: string;
  artist: Artist
}

interface Artist {
  name: string;
  mbid: string;
  url: string;
}
