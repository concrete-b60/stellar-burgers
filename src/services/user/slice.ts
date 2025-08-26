import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  checkUserAuth,
  login,
  logout,
  registerUser,
  setIsAuthChecked,
  updateUser
} from './actions';

interface IUserState {
  data: TUser | null;
  isAuthChecked: boolean;
  error?: string | null;
}
export const initialState: IUserState = {
  data: null,
  isAuthChecked: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      state.error = null;
    }
  },
  selectors: {
    selectUser: (state) => state.data,
    selectIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.data = action.payload;
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.data = null;
        state.isAuthChecked = true;
        state.error = action.payload
          ? String(action.payload)
          : action.error.message || 'Неизвестная ошибка';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.data = null;
      })
      .addCase(setIsAuthChecked, (state, action) => {
        state.isAuthChecked = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.data = action.payload;
        console.log(action.payload);
        state.error = null;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.data = null;
        state.error =
          action.payload || action.error.message || 'Ошибка обновления токена';
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(
        checkUserAuth.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.data = action.payload;
          state.isAuthChecked = true;
          state.error = null;
        }
      )
      .addCase(checkUserAuth.rejected, (state) => {
        state.data = null;
        state.isAuthChecked = true;
      });
  }
});

export const { setUser } = userSlice.actions;
export const { selectUser, selectIsAuthChecked } = userSlice.selectors;
