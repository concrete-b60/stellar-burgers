import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrders } from './actions';

interface IOrderListState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
}
export const initialState: IOrderListState = {
  orders: [],
  loading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    }
  },
  selectors: {
    selectOrders: (state: IOrderListState) => state.orders,
    selectOrdersLoading: (state: IOrderListState) => state.loading,
    selectOrdersError: (state: IOrderListState) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});

export const { setOrders } = orderSlice.actions;
export const { selectOrders, selectOrdersLoading, selectOrdersError } =
  orderSlice.selectors;
