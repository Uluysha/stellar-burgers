import { TIngredient } from '@utils-types';
import reducer, {
  addIngredients,
  deleteIngredient,
  initialState,
  moveIngredient,
  resetConstructor,
  setBun
} from '../slices/constructor';

const mockBun: TIngredient = {
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
};

const mockMain: TIngredient = {
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
};

const mockSauce: TIngredient = {
  _id: '3',
  name: 'Соус традиционный галактический',
  type: 'sauce',
  proteins: 42,
  fat: 24,
  carbohydrates: 42,
  calories: 99,
  price: 15,
  image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
};

describe('[constructorSlice]', () => {
  it('корректная инициализация', () => {
    const state = reducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  it('добавление булки', () => {
    const currentIngredient = { ...mockBun, id: 'uuid-1' };
    const state = reducer(initialState, setBun(currentIngredient));

    expect(state.bun).toEqual(currentIngredient);
    expect(state.ingredients).toEqual([]);
  });

  it('добавление начинки', () => {
    const currentIngredient = { ...mockMain, id: 'uuid-2' };
    const state = reducer(initialState, addIngredients(currentIngredient));

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(currentIngredient);
  });

  it('добавление соуса', () => {
    const currentIngredient = { ...mockSauce, id: 'uuid-3' };
    const state = reducer(initialState, addIngredients(currentIngredient));

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(currentIngredient);
  });

  it('удаление ингредиента по id', () => {
    const initial = {
      bun: null,
      ingredients: [
        { ...mockMain, id: 'uuid-1' },
        { ...mockSauce, id: 'uuid-2' },
        { ...mockMain, id: 'uuid-3' }
      ]
    };

    const state = reducer(initial, deleteIngredient('uuid-2'));

    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients.map((i) => i.id)).toEqual(['uuid-1', 'uuid-3']);
  });

  it('перемещение начинки выше', () => {
    const initial = {
      bun: null,
      ingredients: [
        { ...mockMain, id: 'uuid-1', name: 'Котлета' },
        { ...mockSauce, id: 'uuid-2', name: 'Соус' },
        { ...mockMain, id: 'uuid-3', name: 'Сыр' }
      ]
    };

    const state = reducer(initial, moveIngredient({ from: 2, to: 1 }));

    expect(state.ingredients[0].name).toBe('Котлета');
    expect(state.ingredients[1].name).toBe('Сыр');
    expect(state.ingredients[2].name).toBe('Соус');
  });

  it('перемещение начинки ниже', () => {
    const initial = {
      bun: null,
      ingredients: [
        { ...mockMain, id: 'uuid-1', name: 'Котлета' },
        { ...mockSauce, id: 'uuid-2', name: 'Соус' },
        { ...mockMain, id: 'uuid-3', name: 'Сыр' }
      ]
    };

    const state = reducer(initial, moveIngredient({ from: 0, to: 1 }));

    expect(state.ingredients[0].name).toBe('Соус');
    expect(state.ingredients[1].name).toBe('Котлета');
    expect(state.ingredients[2].name).toBe('Сыр');
  });

  it('перемещение начинки слишком низко', () => {
    const initial = {
      bun: null,
      ingredients: [
        { ...mockMain, id: 'uuid-1', name: 'Котлета' },
        { ...mockSauce, id: 'uuid-2', name: 'Соус' },
        { ...mockMain, id: 'uuid-3', name: 'Сыр' }
      ]
    };

    const state = reducer(initial, moveIngredient({ from: 2, to: 3 }));

    expect(state.ingredients[0].name).toBe('Котлета');
    expect(state.ingredients[1].name).toBe('Соус');
    expect(state.ingredients[2].name).toBe('Сыр');
  });

  it('очистка конструктора', () => {
    const filledState = {
      bun: { ...mockBun, id: 'bun-id' },
      ingredients: [
        { ...mockMain, id: '1' },
        { ...mockSauce, id: '2' }
      ]
    };

    const state = reducer(filledState as any, resetConstructor());
    expect(state).toEqual(initialState);
  });
});
