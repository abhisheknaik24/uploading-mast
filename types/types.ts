import { IconType } from 'react-icons';

export interface IUser {
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string;
  picture?: string;
}

export interface ISong {
  id: string;
  title: string;
  desc: string;
  author: string;
  thumbnail: string;
  audio: string;
  liked?: boolean;
  category?: string;
}

export interface IPlaylist {
  category: string;
  image?: string;
  label: string;
}

export interface IRoute {
  href: string;
  icon: IconType;
  label: string;
  active: boolean;
}

export interface IInput {
  label?: string;
  type: string;
  id: string;
  name: string;
}
