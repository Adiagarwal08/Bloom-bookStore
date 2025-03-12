import { createContext, useReducer } from "react";

const CartsContext = createContext();

const cartsReducer = (state, action) => {
  switch (action.type) {
    case "SET_CARTS":
      return {
        carts: action.payload,
      };
    case "CREATE_CART":
      return {
        carts: [action.payload, ...state.carts],
      };
    case "UPDATE_CART":
      return {
        ...state,
        carts: state.carts.map((cart) =>
          cart._id === action.payload._id
            ? { ...cart, ...action.payload }
            : cart
        ),
      };
    case "REMOVE_CART":
      return {
        carts: state.carts.filter((cart) => cart._id !== action.payload),
      };
    default:
      return state;
  }
};

const CartsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartsReducer, {
    carts: [],
  });
  return (
    <CartsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartsContext.Provider>
  );
};

export { CartsContext, CartsContextProvider };
