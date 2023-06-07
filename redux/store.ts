import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import songReducer from './song/songSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    song: songReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
