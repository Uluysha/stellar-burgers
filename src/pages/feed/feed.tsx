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
      dispatch(getFeeds());
    }
  }, [dispatch]);

  if (request) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
