import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const login = createAsyncThunk(
  'user/login',
  (data: TLoginData, { rejectWithValue }) =>
    loginUserApi(data)
      .then((res) => {
        setCookie('accessToken', res.accessToken);
        setCookie('refreshToken', res.refreshToken);
        return res.user;
      })
      .catch((error) =>
        rejectWithValue(
          error.message || 'Ошибка при получении данных пользователя'
        )
      )
);

export const logout = createAsyncThunk('user/logout', () =>
  logoutApi().finally(() => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
  })
);

export const getUser = createAsyncThunk(
  'user/getUser',
  (_, { rejectWithValue }) => {
    getUserApi()
      .then((res) => res)
      .catch((error) =>
        rejectWithValue(
          error.message || 'Ошибка при получении данных пользователя'
        )
      );
  }
);

export const setIsAuthChecked = createAction<boolean, 'user/setIsAuthChecked'>(
  'user/setIsAuthChecked'
);

export const checkUserAuth = createAsyncThunk<
  TUser,
  void,
  { rejectValue: string }
>('user/checkUserAuth', (_, { rejectWithValue }) => {
  if (!getCookie('accessToken')) {
    return rejectWithValue('No token');
  }
  return getUserApi()
    .then((res) => res.user)
    .catch((error) =>
      rejectWithValue(error.message || 'Ошибка при проверки пользователя')
    );
});

export const registerUser = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('user/registerUser', (data, { rejectWithValue }) =>
  registerUserApi(data)
    .then((res) => {
      setCookie('accessToken', res.accessToken);
      setCookie('refreshToken', res.refreshToken);
      return res.user;
    })
    .catch((error) =>
      rejectWithValue(error.message || 'Ошибка при регистрации пользователя')
    )
);

export const updateUser = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('user/updateUser', (data, { rejectWithValue }) =>
  updateUserApi(data)
    .then((res) => res.user)
    .catch((error) =>
      rejectWithValue(
        error.message || 'Ошибка при обновлении данных пользователя'
      )
    )
);
