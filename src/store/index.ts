import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import dataReducer from "./features/data";

export const store = configureStore({
  reducer: {
    data: dataReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;