import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

/* Получение информации об ингредиентах */
export const getIngredients = createAsyncThunk<TIngredient[], void>(
  'igredients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);
