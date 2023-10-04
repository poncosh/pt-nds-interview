import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import studentSlice from "./reducer/studentReducer";

export const store = configureStore({
  reducer: {
    students: studentSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
