import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

/* Получение информации об ингредиентах */
export const getIngredients = createAsyncThunk(
  'igredients/getIngredients',
  getIngredientsApi
);
