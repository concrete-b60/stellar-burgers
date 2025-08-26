import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const placeOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('order/placeOrder', (ingredientsId, { rejectWithValue }) => {
  if (!ingredientsId || ingredientsId.length === 0) {
    return Promise.reject('Массив ингредиентов пустой');
  }
  return orderBurgerApi(ingredientsId)
    .then((response) => response.order)
    .catch((error) =>
      rejectWithValue(error.message || 'Ошибка при оформлении заказа')
    );
});
