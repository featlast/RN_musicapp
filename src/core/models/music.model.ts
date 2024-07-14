export interface Music {
  id:string;
  name: string;
  url: string;
  duration: string;
  listeners: string;
  mbid:string;
  artist: Artist
  image: Image[]
}

interface Artist {
  name: string;
  mbid: string;
  url: string;
}
interface Image {
  "#text": string;
  size:    Size;
}

enum Size {
  Extralarge = "extralarge",
  Large = "large",
  Medium = "medium",
  Small = "small",
}


