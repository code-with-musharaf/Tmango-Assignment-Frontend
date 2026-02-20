import { configureStore } from "@reduxjs/toolkit";
import globalSliceReducer from "./slices/global.slice";
export const store = configureStore({
  reducer: {
    global: globalSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
