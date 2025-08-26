import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { placeOrder } from './actions';

interface IConstructorState {
  burger: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: string | null;
}

const initialState: IConstructorState = {
  burger: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  orderError: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TConstructorIngredient>) {
      state.burger.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      if (action.payload.type === 'bun') {
        state.burger.bun = action.payload;
      } else {
        state.burger.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action) => {
      state.burger.ingredients.splice(action.payload, 1);
    },
    moveUp: (state, action) => {
      const i = action.payload;
      const temp = state.burger.ingredients[i - 1];
      state.burger.ingredients[i - 1] = state.burger.ingredients[i];
      state.burger.ingredients[i] = temp;
    },
    moveDown: (state, action) => {
      const i = action.payload;
      const temp = state.burger.ingredients[i + 1];
      state.burger.ingredients[i + 1] = state.burger.ingredients[i];
      state.burger.ingredients[i] = temp;
    },

    setOrderModalData(state, action: PayloadAction<TOrder | null>) {
      state.orderModalData = action.payload;
    },
    clearConstructor(state) {
      state.burger.bun = null;
      state.burger.ingredients = [];
      state.orderRequest = false;
      state.orderModalData = null;
      state.orderError = null;
    }
  },
  selectors: {
    selectConstructorItems: (state: IConstructorState) => state.burger,
    selectOrderRequest: (state: IConstructorState) => state.orderRequest,
    selectOrderModalData: (state: IConstructorState) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
        state.burger.bun = null;
        state.burger.ingredients = [];
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload || 'Неизвестная ошибка';
      });
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveUp,
  moveDown,
  setOrderModalData,
  clearConstructor
} = burgerConstructorSlice.actions;

export const {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData
} = burgerConstructorSlice.selectors;
