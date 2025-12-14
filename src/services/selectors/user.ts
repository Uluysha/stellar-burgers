import { RootState } from '@store';

export const getUserSelector = (state: RootState) => state.user.user;
export const getIsAuthSelector = (state: RootState) => !!state.user.user;
export const getIsAuthCheckedSelector = (state: RootState) =>
  state.user.isAuthChecked;
export const getLoginErrorSelector = (state: RootState) =>
  state.user.loginError;
export const getRegisterErrorSelector = (state: RootState) =>
  state.user.registerError;
