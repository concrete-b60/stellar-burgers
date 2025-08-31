import { initialState as initialStateBurger } from './burger/slice';
import { initialState as initialStateConstructor } from './constructor/slice';
import { initialState as initialStateFeed } from './feed/slice';
import { initialState as initialStateOrder } from './order/slice';
import { rootReducer } from './store';
import { initialState as initialStateUser } from './user/slice';

describe('инициализация rootReducer', () => {
  test('Инициализация store', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      burger: initialStateBurger,
      'burger-constructor': initialStateConstructor,
      feed: initialStateFeed,
      user: initialStateUser,
      order: initialStateOrder
    });
  });
});
