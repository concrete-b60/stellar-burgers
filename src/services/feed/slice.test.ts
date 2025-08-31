import { TOrdersData } from '@utils-types';
import { getFeeds } from './actions';
import { feedSlice, initialState, setFeed } from './slice';

const mockFeeds: TOrdersData = {
  orders: [
    {
      _id: '68b2f30f673086001ba8572a',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный люминесцентный бургер',
      createdAt: '2025-08-30T12:48:15.080Z',
      updatedAt: '2025-08-30T12:48:16.845Z',
      number: 87485
    }
  ],
  total: 1,
  totalToday: 1
};

describe('feedSlice reducer', () => {
  test('Проверка начального состояния', () => {
    expect(feedSlice.reducer(undefined, { type: '@@INIT' })).toEqual(
      initialState
    );
  });

  test('Проверка setFeed', () => {
    const state = feedSlice.reducer(initialState, setFeed(mockFeeds));
    expect(state.feeds).toEqual(mockFeeds);
  });

  test('Проверка pending', () => {
    const state = feedSlice.reducer(initialState, {
      type: getFeeds.pending.type
    });
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  test('Проверка rejected', () => {
    const errorMessage = 'Ошибка загрузки';
    const state = feedSlice.reducer(initialState, {
      type: getFeeds.rejected.type,
      payload: errorMessage
    });
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: errorMessage
    });
  });

  test('Проверка fulfilled', () => {
    const state = feedSlice.reducer(initialState, {
      type: getFeeds.fulfilled.type,
      payload: mockFeeds
    });
    expect(state).toEqual({
      ...initialState,
      loading: false,
      feeds: mockFeeds
    });
  });
});
