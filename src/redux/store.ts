import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { meetingsSlice } from "./meetingsSlice.ts";
import { useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  meetings: meetingsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
