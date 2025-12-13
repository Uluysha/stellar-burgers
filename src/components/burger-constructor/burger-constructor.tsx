import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import {
  getBurgerConstructorSelector,
  getIsAuthSelector,
  getOrderModalDataSelector,
  getOrderRequestSelector
} from '@selectors';
import { orderBurger } from '@thunks';
import { clearOrderModalData } from '@slices';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getBurgerConstructorSelector);
  const orderModalData = useSelector(getOrderModalDataSelector);
  const orderRequest = useSelector(getOrderRequestSelector);
  const isAuth = useSelector(getIsAuthSelector);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuth) {
      navigate('/login');
      return;
    }

    if (constructorItems.ingredients.length === 0) {
      return;
    }

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ];

    console.log('Запрос на заказ бургера');
    dispatch(orderBurger(ingredientsIds));
  };

  const closeOrderModal = () => {
    console.log('Закрытие модалки с заказом');
    dispatch(clearOrderModalData());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
