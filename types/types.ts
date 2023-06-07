export interface ISong {
  id: string;
  title: string;
  desc: string;
  author: string;
  thumbnail: string;
  audioLink: string;
  liked?: boolean;
}

export interface ICurrentSong {
  id: string;
  title: string;
  desc: string;
  author: string;
  thumbnail: string;
  audioLink: string;
  liked?: boolean;
  isPlay: boolean;
  isMute: boolean;
}
