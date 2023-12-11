import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}/api`,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});
