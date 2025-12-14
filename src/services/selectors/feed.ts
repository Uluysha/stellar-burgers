import { RootState } from '@store';

export const getOrdersSelector = (state: RootState) => state.feed.orders;
export const getCurrentOrderSelector = (state: RootState) =>
  state.feed.currentOrder;
export const getOrderRequestSelector = (state: RootState) =>
  state.feed.orderRequest;
export const getOrderModalDataSelector = (state: RootState) =>
  state.feed.currentOrder;
export const getFeedTotalSelector = (state: RootState) => state.feed.total;
export const getFeedTotalTodaySelector = (state: RootState) =>
  state.feed.totalToday;
