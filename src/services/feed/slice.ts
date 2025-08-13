import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeeds } from './actions';

interface IFeedListState {
  feeds: TOrdersData;
  loading: boolean;
  error: string | null;
}
export const initialState: IFeedListState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<TOrdersData>) => {
      state.feeds = action.payload;
    }
  },
  selectors: {
    selectFeeds: (state: IFeedListState) => state.feeds,
    selectLoading: (state: IFeedListState) => state.loading,
    selectError: (state: IFeedListState) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.loading = false;
          state.feeds = action.payload;
        }
      )
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});

export const { setFeed } = feedSlice.actions;
export const { selectFeeds, selectLoading, selectError } = feedSlice.selectors;
