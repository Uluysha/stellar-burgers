import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { TOrder, TOrdersData } from '@utils-types';
import { resetConstructor } from '@slices';

/* Получение истории заказов пользователя */
export const getOrders = createAsyncThunk<TOrder[], void>(
  'order/getOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

/* Получение заказа пользователя по номеру */
export const getOrder = createAsyncThunk<TOrder, number>(
  'feed/getOrder',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

/* Создание нового заказа пользователя */
export const orderBurger = createAsyncThunk<TOrder, string[]>(
  'order/orderBurger',
  async (ingredients: string[], { dispatch }) => {
    try {
      const response = await orderBurgerApi(ingredients);

      dispatch(resetConstructor());

      return response.order;
    } catch (error) {
      throw error;
    }
  }
);

/* Получение списка заказов пользователя */
export const getFeeds = createAsyncThunk<TOrdersData, void>(
  'feed/getFeeds',
  async () => {
    const response = await getFeedsApi();
    return response;
  }
);
