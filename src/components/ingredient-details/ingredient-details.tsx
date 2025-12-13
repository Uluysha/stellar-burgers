import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '@store';
import { getIngredientsSelector } from '@selectors';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const allIngredients = useSelector(getIngredientsSelector);

  const ingredientData = useMemo(
    () => allIngredients.find((ing) => ing._id === id) || null,
    [allIngredients, id]
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
