import { CartsContext } from "../context/CartContext";
import { useContext } from "react";

const useCartsContext = () => {
  const context = useContext(CartsContext);

  if (!context) {
    throw new Error(
      "useCartsContext must be used inside an CartsContextProvider."
    );
  }

  return context;
};

export default useCartsContext;
