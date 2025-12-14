import { TOrdersData } from '@utils-types';
import reducer, {
  clearOrderModalData,
  initialState,
  setCurrentOrder
} from '../slices/feed';
import { getFeeds } from '@thunks';

const mockOrdersData: TOrdersData = {
  orders: [
    {
      _id: 'order0',
      status: 'done',
      name: 'Странный бургер',
      createdAt: '2025-12-13T15:00:00.000Z',
      updatedAt: '2025-12-131T15:20:00.000Z',
      number: 99998,
      ingredients: ['ingredient0', 'ingredient1']
    },
    {
      _id: 'order1',
      status: 'pending',
      name: 'Ещё более странный бургер',
      createdAt: '2025-12-13T13:00:00.000Z',
      updatedAt: '2025-12-13T13:15:00.000Z',
      number: 99999,
      ingredients: ['ingredient2']
    }
  ],
  total: 13975,
  totalToday: 17
};

describe('[orderSlice]', () => {
  it('неизвестный action -> initialState', () => {
    const state = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('текущий заказ', () => {
    const currentOrder = { ...mockOrdersData }.orders[0];
    const state = reducer(initialState, setCurrentOrder(currentOrder));

    expect(state.currentOrder).toEqual(currentOrder);
  });

  it('очищение модалки с заказом', () => {
    const state = reducer(initialState, clearOrderModalData());

    expect(state.currentOrder).toBeNull();
  });

  describe('getFeeds', () => {
    it('pending: isLoading = true, error = null', () => {
      const state = reducer(initialState, getFeeds.pending(''));

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.orders).toEqual(initialState.orders);
      expect(state.total).toEqual(initialState.total);
      expect(state.totalToday).toEqual(initialState.totalToday);
    });

    it('fulfilled: сохраняет данные заказов и isLoading = false', () => {
      const state = reducer(
        initialState,
        getFeeds.fulfilled(mockOrdersData, '')
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orders).toEqual(mockOrdersData.orders);
      expect(state.total).toEqual(mockOrdersData.total);
      expect(state.totalToday).toEqual(mockOrdersData.totalToday);
    });
  });
});
