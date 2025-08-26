import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

interface IBurgerListState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}
export const initialState: IBurgerListState = {
  ingredients: [],
  loading: false,
  error: null
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setIngredient: (state, action: PayloadAction<TIngredient[]>) => {
      state.ingredients = action.payload;
    }
  },
  selectors: {
    selectIngredients: (state: IBurgerListState) => state.ingredients,
    selectLoading: (state: IBurgerListState) => state.loading,
    selectError: (state: IBurgerListState) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});

export const { setIngredient } = burgerSlice.actions;
export const { selectIngredients, selectLoading, selectError } =
  burgerSlice.selectors;
