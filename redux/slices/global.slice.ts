import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IGlobalState {
  theme: "light" | "dark";
  loading: boolean;
  userDetails: any;
  selectedDay: number;
}

const initialState: IGlobalState = {
  theme: "light",
  loading: false,
  userDetails: null,
  selectedDay: 1,
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
    setSelectedDay: (state, { payload }: PayloadAction<number>) => {
      state.selectedDay = payload;
    },
  },
});

export const { setTheme, setGlobalLoading, setUserDetails, setSelectedDay } =
  globalSlice.actions;

export default globalSlice.reducer;
