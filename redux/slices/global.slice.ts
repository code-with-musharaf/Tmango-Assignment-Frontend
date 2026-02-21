import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IGlobalState {
  theme: "light" | "dark";
  loading: boolean;
  userDetails: any;
}

const initialState: IGlobalState = {
  theme: "light",
  loading: false,
  userDetails: null,
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
    setUserDetails: (state, { payload }: PayloadAction<any>) => {
      state.userDetails = payload;
    },
  },
});

export const { setTheme, setGlobalLoading, setUserDetails } =
  globalSlice.actions;

export default globalSlice.reducer;
