import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();

const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "" },

  wish: Cookies.get("wish")
    ? JSON.parse(Cookies.get("wish"))
    : { wishItems: [] },

  settingBox: { isOpen: false },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_RESET":
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: "",
        },
      };

    case "CART_CLEAR_ITEMS":
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };

    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };

    case "openSettingBox":
      return {
        ...state,
        settingBox: {
          ...(state.settingBox.isOpen = true),
        },
      };

    // add items in wish of wishItem
    case "WISH_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.wish.wishItems.find(
        (item) => item.slug === newItem.slug
      );

      const wishItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.wish.wishItems, newItem];
      Cookies.set("wish", JSON.stringify({ ...state.wish, wishItems }));
      return { ...state, wish: { ...state.wish, wishItems } };
    }
    case "WISH_REMOVE_ITEM": {
      const wishItems = state.wish.wishItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set("wish", JSON.stringify({ ...state.wish, wishItems }));
      return { ...state, wish: { ...state.wish, wishItems } };
    }

    case "WISH_CLEAR_ITEMS":
      return { ...state, wish: { ...state.wish, wishItems: [] } };

    case "closeSettingBox":
      return {
        ...state,
        settingBox: {
          ...(state.settingBox.isOpen = false),
        },
      };

    case "toggleSettingBox":
      return {
        ...state,
        settingBox: {
          ...(state.settingBox.isOpen = !state.isOpen),
        },
      };

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
