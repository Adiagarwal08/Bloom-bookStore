import useAuthContext from "./useAuthContext";
import useCartsContext from "./useCartsContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: cartDispatch } = useCartsContext();

  const logout = () => {
    //remove user from storage
    localStorage.removeItem("user");

    //dispatch logout action
    dispatch({ type: "LOGOUT" });
    cartDispatch({ type: "SET_CARTS", payload: null });
  };

  return { logout };
};

export default useLogout;
