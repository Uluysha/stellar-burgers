import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TContructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};
export const initialState: TContructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'createburger',
  initialState,
  reducers: {
    addIngredients: (state, action: PayloadAction<TConstructorIngredient>) => {
      const newIngreient = action.payload;
      state.ingredients.push(newIngreient);
    },

    setBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.bun = action.payload;
    },

    deleteIngredient: (state, action: PayloadAction<string>) => {
      action.payload;
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;

      const ingredients = [...state.ingredients];

      const [moveItem] = ingredients.splice(from, 1);
      ingredients.splice(to, 0, moveItem);
      state.ingredients = ingredients;
    },

    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredients,
  setBun,
  deleteIngredient,
  moveIngredient,
  resetConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
