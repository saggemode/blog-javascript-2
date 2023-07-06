import { combineReducers, configureStore } from "@reduxjs/toolkit";
import Reducer from "./reducer";
import listenerMiddleware from "./listener";
import cartReducer, { getTotals } from "./cartSlice";
const combinedReducer = combineReducers({
  Reducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: {
    reducer: combinedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

store.dispatch(getTotals());
