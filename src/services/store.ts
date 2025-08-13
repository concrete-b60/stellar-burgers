import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerSlice } from './burger/slice';
import { burgerConstructorSlice } from './constructor/slice';
import { feedSlice } from './feed/slice';
import { orderSlice } from './order/slice';
import { userSlice } from './user/slice';

const rootReducer = combineSlices(
  burgerSlice,
  burgerConstructorSlice,
  feedSlice,
  userSlice,
  orderSlice
);

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
