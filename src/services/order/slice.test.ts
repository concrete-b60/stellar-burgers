import { TOrder } from '@utils-types';
import { getOrders } from './actions';
import { initialState, orderSlice, setOrders } from './slice';

const mockOrder: TOrder[] = [
  {
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
  },
  {
    _id: '2',
    number: 87558,
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2025-08-31T10:47:13.622Z',
    updatedAt: '2025-08-31T10:47:14.476Z',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ]
  }
];
describe('orderSlice reducer', () => {
  test('Проверка начального состояния', () => {
    expect(orderSlice.reducer(undefined, { type: '@@INIT' })).toEqual(
      initialState
    );
  });

  test('Проверка setOrders', () => {
    const state = orderSlice.reducer(initialState, setOrders(mockOrder));
    expect(state.orders).toEqual(mockOrder);
  });

  test('Проверка pending', () => {
    const state = orderSlice.reducer(initialState, {
      type: getOrders.pending.type
    });
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  test('Проверка rejected', () => {
    const errorMessage = 'Ошибка загрузки';
    const state = orderSlice.reducer(initialState, {
      type: getOrders.rejected.type,
      payload: errorMessage
    });
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: errorMessage
    });
  });

  test('Проверка fulfilled', () => {
    const state = orderSlice.reducer(initialState, {
      type: getOrders.fulfilled.type,
      payload: mockOrder
    });
    expect(state).toEqual({
      ...initialState,
      loading: false,
      orders: mockOrder
    });
  });
});
