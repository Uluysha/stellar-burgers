import { RootState } from '@store';

export const getIngredientsSelector = (state: RootState) =>
  state.ingredients.ingredients;
export const getIngredientsLoadingSelector = (state: RootState) =>
  state.ingredients.isLoading;
