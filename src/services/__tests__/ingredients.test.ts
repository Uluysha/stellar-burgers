import { TIngredient } from '@utils-types';
import reducer, { initialState } from '../slices/ingredients';
import { getIngredients } from '@thunks';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  },
  {
    _id: '2',
    name: 'Кристаллы марсианских альфа-сахаридов',
    type: 'main',
    proteins: 234,
    fat: 432,
    carbohydrates: 111,
    calories: 189,
    price: 762,
    image: 'https://code.s3.yandex.net/react/code/core.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/core-large.png'
  },
  {
    _id: '3',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 14,
    image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
  }
];

describe('[ingredientsSlice]', () => {
  it('неизвестный action -> initialState', () => {
    const state = reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  describe('getIngredients', () => {
    it('pending: isLoading = true, error = null', () => {
      const state = reducer(initialState, getIngredients.pending(''));

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual([]);
    });

    it('fulfilled: сохраняет ингредиенты и isLoading = false', () => {
      const state = reducer(
        initialState,
        getIngredients.fulfilled(mockIngredients, '')
      );

      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toEqual(mockIngredients);
      expect(state.error).toBeNull();
    });
  });
});
