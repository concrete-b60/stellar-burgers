import { TUser } from '@utils-types';
import {
  checkUserAuth,
  login,
  logout,
  registerUser,
  setIsAuthChecked,
  updateUser
} from './actions';
import { initialState, setUser, userSlice } from './slice';

const mockUser: TUser = {
  email: 'test@ya.ru',
  name: 'Тестов Тест Тестович'
};

describe('userSlice reducer', () => {
  test('Проверка начального состояния', () => {
    expect(userSlice.reducer(undefined, { type: '@@INIT' })).toEqual(
      initialState
    );
  });

  test('Проверка setUser', () => {
    const state = userSlice.reducer(initialState, setUser(mockUser));
    expect(state.data).toEqual(mockUser);
    expect(state.error).toBeNull();
  });

  test('Проверка login.fulfilled', () => {
    const state = userSlice.reducer(initialState, {
      type: login.fulfilled.type,
      payload: mockUser
    });
    expect(state).toEqual({
      data: mockUser,
      isAuthChecked: true,
      error: null
    });
  });

  test('Проверка login.rejected', () => {
    const errorMessage = 'Ошибка логина';
    const state = userSlice.reducer(initialState, {
      type: login.rejected.type,
      payload: errorMessage,
      error: { message: errorMessage }
    });
    expect(state.data).toBeNull();
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe('Ошибка логина');
  });

  test('Проверка logout.fulfilled', () => {
    const preState = { ...initialState, data: mockUser };
    const state = userSlice.reducer(preState, {
      type: logout.fulfilled.type
    });
    expect(state.data).toBeNull();
  });

  test('Проверка setIsAuthChecked', () => {
    const state = userSlice.reducer(initialState, {
      type: setIsAuthChecked.type,
      payload: true
    });
    expect(state.isAuthChecked).toBe(true);
  });

  test('Проверка registerUser.pending', () => {
    const prevState = { ...initialState, error: 'Ошибка' };
    const state = userSlice.reducer(prevState, {
      type: registerUser.pending.type
    });
    expect(state.error).toBeNull();
  });

  test('Проверка registerUser.fulfilled', () => {
    const state = userSlice.reducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: mockUser
    });
    expect(state.data).toEqual(mockUser);
  });

  test('Проверка registerUser.rejected', () => {
    const errorMessage = 'Ошибка регистрации';
    const state = userSlice.reducer(initialState, {
      type: registerUser.rejected.type,
      payload: errorMessage
    });
    expect(state.error).toBe(errorMessage);
  });

  test('Проверка updateUser.pending', () => {
    const prevState = { ...initialState, error: 'Ошибка' };
    const state = userSlice.reducer(prevState, {
      type: updateUser.pending.type
    });
    expect(state.error).toBeNull();
  });

  test('Проверка updateUser.fulfilled', () => {
    const state = userSlice.reducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: mockUser
    });
    expect(state.data).toEqual(mockUser);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  test('Проверка updateUser.rejected', () => {
    const errorMessage = 'Ошибка обновления';
    const state = userSlice.reducer(initialState, {
      type: updateUser.rejected.type,
      payload: errorMessage
    });
    expect(state.data).toBeNull();
    expect(state.error).toBe(errorMessage);
    expect(state.isAuthChecked).toBe(true);
  });

  test('Проверка checkUserAuth.pending', () => {
    const prevState = { ...initialState, isAuthChecked: true };
    const state = userSlice.reducer(prevState, {
      type: checkUserAuth.pending.type
    });
    expect(state.isAuthChecked).toBe(false);
  });

  test('Проверка checkUserAuth.fulfilled', () => {
    const state = userSlice.reducer(initialState, {
      type: checkUserAuth.fulfilled.type,
      payload: mockUser
    });
    expect(state.data).toEqual(mockUser);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  test('Проверка checkUserAuth.rejected', () => {
    const prevState = { ...initialState, data: mockUser };
    const state = userSlice.reducer(prevState, {
      type: checkUserAuth.rejected.type
    });
    expect(state.data).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });
});
