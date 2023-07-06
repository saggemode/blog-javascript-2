import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import users from "./usersSlice";
import counter from "./counterSlice";
import cart from "./cartSlice";


const combinedReducer = combineReducers({
  counter,
  users,
  cart,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      counter: {
        count: state.counter.count + action.payload.counter.count,
      },
      users: {
        users: [...action.payload.users.users, ...state.users.users],
      },

      cart: {
        cart: [...action.payload.cart.cart, ...state.cart.cart],
      },
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore, { debug: true });
