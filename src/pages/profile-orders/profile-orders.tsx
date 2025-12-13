import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrdersSelector } from '@selectors';
import { useDispatch, useSelector } from '@store';
import { getOrders, logoutUser } from '@thunks';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrdersSelector);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileOrdersUI orders={orders} onLogout={handleLogout} />;
};
