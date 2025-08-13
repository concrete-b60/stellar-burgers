import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

export const getFeeds = createAsyncThunk<
  TOrdersData,
  void,
  { rejectValue: string }
>('feed/getFeeds', async (_, { rejectWithValue }) => {
  try {
    return await getFeedsApi();
  } catch (error) {
    return rejectWithValue('Ошибка загрузки заказов');
  }
});
