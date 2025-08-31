import { TIngredient, TOrder } from '@utils-types';
import { placeOrder } from './actions';
import {
  addIngredient,
  burgerConstructorSlice,
  clearConstructor,
  initialState,
  moveDown,
  moveUp,
  removeIngredient,
  setOrderModalData
} from './slice';

const mockBunIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const mockMainIngredient: TIngredient = {
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

const mockSauceIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
};

const mockOrder: TOrder = {
  _id: '1',
  number: 87334,
  status: 'done',
  name: 'Флюоресцентный spicy био-марсианский бургер',
  createdAt: '2025-08-29T08:00:00.000Z',
  updatedAt: '2025-08-29T08:00:00.000Z',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa0942'
  ]
};

describe('burgerConstructorSlice reducer', () => {
  test('Проверка начального состояния', () => {
    expect(
      burgerConstructorSlice.reducer(undefined, { type: '@@INIT' })
    ).toEqual(initialState);
  });

  test('Проверка добавления булки', () => {
    const state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(mockBunIngredient)
    );
    expect(state.burger.ingredients).toHaveLength(0);
    expect(state.burger.bun).toEqual(mockBunIngredient);
  });

  test('Проверка добавления ингредиента', () => {
    const state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(mockMainIngredient)
    );
    expect(state.burger.ingredients).toHaveLength(1);
    expect(state.burger.ingredients[0]).toEqual(mockMainIngredient);
  });

  test('Проверка удаления ингредиента', () => {
    let state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(mockMainIngredient)
    );

    expect(state.burger.ingredients).toHaveLength(1);

    state = burgerConstructorSlice.reducer(state, removeIngredient(0));

    expect(state.burger.ingredients).toHaveLength(0);
  });

  test('Проверка перемещения ингредиентов вверх', () => {
    const preState = {
      ...initialState,
      burger: {
        bun: null,
        ingredients: [mockMainIngredient, mockSauceIngredient]
      }
    };
    const state = burgerConstructorSlice.reducer(preState, moveUp(1));
    expect(state.burger.ingredients).toEqual([
      mockSauceIngredient,
      mockMainIngredient
    ]);
  });

  test('Проверка перемещения ингредиентов вниз', () => {
    const preState = {
      ...initialState,
      burger: {
        bun: null,
        ingredients: [mockMainIngredient, mockSauceIngredient]
      }
    };
    const state = burgerConstructorSlice.reducer(preState, moveDown(0));
    expect(state.burger.ingredients).toEqual([
      mockSauceIngredient,
      mockMainIngredient
    ]);
  });

  test('Проверка установки данных заказа в модальное окно', () => {
    const state = burgerConstructorSlice.reducer(
      initialState,
      setOrderModalData(mockOrder)
    );
    expect(state.orderModalData).toEqual(mockOrder);
  });

  test('Проверка сброса состояния к начальному', () => {
    const preState = {
      burger: {
        bun: mockBunIngredient,
        ingredients: [mockMainIngredient, mockSauceIngredient]
      },
      orderRequest: true,
      orderModalData: mockOrder,
      orderError: 'Ошибка заказа'
    };
    const state = burgerConstructorSlice.reducer(preState, clearConstructor());
    expect(state).toEqual(initialState);
  });

  test('Проверка pending', () => {
    const state = burgerConstructorSlice.reducer(initialState, {
      type: placeOrder.pending.type,
      meta: {
        requestId: '1',
        arg: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941']
      }
    });
    expect(state).toEqual({
      ...initialState,
      orderRequest: true,
      orderError: null
    });
  });

  test('Проверка rejected', () => {
    const errorMessage = 'Oшибка создания заказа';
    const state = burgerConstructorSlice.reducer(initialState, {
      type: placeOrder.rejected.type,
      payload: errorMessage,
      meta: {
        requestId: '1',
        arg: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941']
      }
    });
    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      orderError: errorMessage
    });
  });

  test('Проверка fulfilled', () => {
    const stateWithIngredients = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(mockMainIngredient)
    );
    const state = burgerConstructorSlice.reducer(stateWithIngredients, {
      type: placeOrder.fulfilled.type,
      payload: mockOrder,
      meta: {
        requestId: '1',
        arg: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941']
      }
    });
    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      orderModalData: mockOrder,
      orderError: null,
      burger: { bun: null, ingredients: [] }
    });
  });
});
