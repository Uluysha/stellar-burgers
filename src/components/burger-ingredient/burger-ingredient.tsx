import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '@store';
import { nanoid } from '@reduxjs/toolkit';
import { addIngredients, setBun } from '@slices';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      if (!ingredient) return;

      const igredientGeneraidId = {
        ...ingredient,
        id: nanoid()
      };
      if (ingredient.type === 'bun') {
        console.log('Запрос выбора булочки');
        dispatch(setBun(igredientGeneraidId));
      } else {
        console.log('Запрос добавления ингредиента');
        dispatch(addIngredients(igredientGeneraidId));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
