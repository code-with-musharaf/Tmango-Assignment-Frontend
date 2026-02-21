import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IGlobalState {
  theme: "light" | "dark";
  loading: boolean;
}

const initialState: IGlobalState = {
  theme: "light",
  loading: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTheme: (state, { payload }: PayloadAction<"light" | "dark">) => {
      localStorage.setItem("theme", payload);
      state.theme = payload;
    },
    setGlobalLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
  },
});

export const { setTheme, setGlobalLoading } = globalSlice.actions;

export default globalSlice.reducer;
