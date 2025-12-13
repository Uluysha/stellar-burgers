import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { getOrderRequestSelector, getOrdersSelector } from '@selectors';
import { getFeeds } from '@thunks';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrdersSelector);
  const request = useSelector(getOrderRequestSelector);

  useEffect(() => {
    if (orders.length === 0) {
      console.log('Запрос ленты заказов');
      dispatch(getFeeds());
    }
  }, [dispatch]);

  if (request) {
    console.log('Запрос денон');
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
