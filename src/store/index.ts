import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import triviaReducer from "./features/triviaData";

export const store = configureStore({
  reducer: {
    trivia: triviaReducer,
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
