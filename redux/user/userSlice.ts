import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  token: string | null;
}

const initialState: UserState = {
  token: 'user',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken: (state: UserState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    deleteToken: (state: UserState) => {
      state.token = null;
    },
  },
});

export const { addToken, deleteToken } = userSlice.actions;

export default userSlice.reducer;
