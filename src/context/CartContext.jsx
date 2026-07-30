import { createContext, useMemo, useReducer } from "react";

export const CartContext = createContext(null);

const initialState = {
  items: [],
  isOpen: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        };
      }

      return {
        ...state,
        isOpen: true,
        items: [
          ...state.items,
          {
            ...action.payload,
            quantity: 1,
          },
        ],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    case "OPEN_CART":
      return {
        ...state,
        isOpen: true,
      };

    case "CLOSE_CART":
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const subtotal = state.items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  const count = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({
      items: state.items,
      isOpen: state.isOpen,

      subtotal,
      count,

      addItem: (product) =>
        dispatch({
          type: "ADD_ITEM",
          payload: product,
        }),

      removeItem: (id) =>
        dispatch({
          type: "REMOVE_ITEM",
          payload: id,
        }),

      increaseQuantity: (id) =>
        dispatch({
          type: "INCREASE_QUANTITY",
          payload: id,
        }),

      decreaseQuantity: (id) =>
        dispatch({
          type: "DECREASE_QUANTITY",
          payload: id,
        }),

      clearCart: () =>
        dispatch({
          type: "CLEAR_CART",
        }),

      openCart: () =>
        dispatch({
          type: "OPEN_CART",
        }),

      closeCart: () =>
        dispatch({
          type: "CLOSE_CART",
        }),
    }),
    [state.items, state.isOpen, subtotal, count],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
