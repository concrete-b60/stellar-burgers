import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('order/getOrders', (_, { rejectWithValue }) =>
  getOrdersApi()
    .then((res) => res)
    .catch((error) =>
      rejectWithValue(
        error.message || 'Ошибка при обновлении заказа пользователя'
      )
    )
);
