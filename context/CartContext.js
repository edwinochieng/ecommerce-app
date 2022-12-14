import React, { createContext, useReducer } from "react";
import Cookies from "js-cookie";

//create context
export const Store = createContext();

//initial state
const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [], shippingAddress: {} },
};

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
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
      return {
        ...state,
        cart: { ...state.cart, cartItems },
      };
    }
    case "REMOVE_CART_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return {
        ...state,
        cart: { ...state.cart, cartItems },
      };
    }
    case "RESET_CART": {
      return {
        ...state,
        cart: {
          cartItems: {},
          shippingAddress: { location: {} },
          paymentMethod: "",
        },
      };
    }

    case "CLEAR_CART_ITEMS": {
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [],
        },
      };
    }

    case "SAVE_SHIPPING_ADDRESS": {
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
    }
    default:
      return state;
  }
};

//global provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider
      value={{
        cart: state.cart,
        dispatch,
      }}
    >
      {children}
    </Store.Provider>
  );
};
