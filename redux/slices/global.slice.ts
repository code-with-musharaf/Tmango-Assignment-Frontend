import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IGlobalState {
  theme: "light" | "dark";
}

const initialState: IGlobalState = {
  theme: "light",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTheme: (state, { payload }: PayloadAction<"light" | "dark">) => {
      localStorage.setItem("theme", payload);
      state.theme = payload;
    },
  },
});

export const { setTheme } = globalSlice.actions;

export default globalSlice.reducer;
