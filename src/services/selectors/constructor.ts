import { RootState } from '@store';

export const getBurgerConstructorSelector = (state: RootState) =>
  state.burgerConstructor;
