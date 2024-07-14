export interface ArtistMusic {
  id:string;
  name: string;
  url: string;
  duration: string;
  listeners: string;
  playcount:string;
  artist: Artist;
  album: Album;
  wiki:Information

}

interface Artist {
  name: string;
  mbid: string;
  url: string;
}

interface Album {
  artist: string;
  title: string;
  image: ImageArtist[];
}

interface ImageArtist {
  "#text": string;
  size:    Size;
}
enum Size {
  Extralarge = "extralarge",
  Large = "large",
  Medium = "medium",
  Small = "small",
}

interface Artist {
  name: string;
  mbid: string;
  url: string;
}

interface Information{
  published:string;
  content:string;
  summary:string
}
