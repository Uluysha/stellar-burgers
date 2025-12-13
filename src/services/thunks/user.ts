import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';

/* Регистрация пользователя */
export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'user/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

/* Авторизация пользователя */
export const loginUser = createAsyncThunk<TUser, TLoginData>(
  'user/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

/* Получение информации о пользователе */
export const getUser = createAsyncThunk<TUser, void>(
  'user/getUser',
  async () => {
    const res = await getUserApi();
    return res.user;
  }
);

/* Обновление информации о пользователе */
export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

/* Деавторизация пользователя */
export const logoutUser = createAsyncThunk<void, void>(
  'user/logout',
  async () => {
    await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

/* Проверка авторизации пользователя */
export const checkUserAuth = createAsyncThunk<void, void>(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      try {
        await dispatch(getUser()).unwrap();
      } catch (e) {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
  }
);
