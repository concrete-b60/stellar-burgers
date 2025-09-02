import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';
import { burgerSlice, initialState, setIngredient } from './slice';

const mockIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const mockIngredients: TIngredient[] = [mockIngredient];

describe('burgerSlice reducer', () => {
  test('Проверка начального состояния', () => {
    expect(burgerSlice.reducer(undefined, { type: '@@INIT' })).toEqual(
      initialState
    );
  });

  test('Проверка setIngredient', () => {
    const state = burgerSlice.reducer(
      initialState,
      setIngredient(mockIngredients)
    );
    expect(state.ingredients).toEqual(mockIngredients);
  });

  test('Проверка pending', () => {
    const state = burgerSlice.reducer(initialState, {
      type: getIngredients.pending.type
    });
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  test('Проверка rejected', () => {
    const errorMessage = 'Ошибка загрузки';
    const state = burgerSlice.reducer(initialState, {
      type: getIngredients.rejected.type,
      payload: errorMessage
    });
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: errorMessage
    });
  });

  test('Проверка fulfilled', () => {
    const state = burgerSlice.reducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    });
    expect(state).toEqual({
      ...initialState,
      loading: false,
      ingredients: mockIngredients
    });
  });
});
