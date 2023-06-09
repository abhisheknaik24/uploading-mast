import { IconType } from 'react-icons';

export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  picture?: string;
}

export interface ICategory {
  _id: string;
  category: string;
  image?: string;
  name: string;
}

export interface ISong {
  _id: string;
  category?: string;
  title: string;
  desc: string;
  author: string;
  thumbnail?: string;
  audio: string;
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

export interface IResponse {
  success: boolean;
  data?: any;
  message?: string;
}
