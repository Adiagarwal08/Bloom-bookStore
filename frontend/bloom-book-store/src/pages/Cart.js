import "../pages/Cart.css";
import CartItem from "../components/CartItem";
import emptyCart from "../images/empty-cart.jpeg";
import { useEffect } from "react";
import useCartsContext from "../hooks/useCartsContext";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const Cart = () => {
  const { carts, dispatch } = useCartsContext();

  const { user } = useAuthContext();

  const subtotal =
    carts?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch("/api/carts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) throw new Error("No such item");

        const json = await response.json();
        dispatch({ type: "SET_CARTS", payload: json });
      } catch (error) {
        console.log("Error fetching cart items", error);
      }
    };

    if (user) {
      fetchItem();
    }
  }, [dispatch, user]);
  return (
    <div className="cart">
      <h1 style={{ textAlign: "center" }}>Cart</h1>

      {carts.length === 0 ? (
        <div className="empty-cart">
          <img src={emptyCart} alt="empty-bag" />
          <h2>Hey, it feels so light!</h2>
          <p>There is nothing in your bag. Let's add some items.</p>
          <Link to="/catalogue">
            <button className="continue-shopping">Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-heading">
            <span>TYPE</span>
            <span>ITEM</span>
            <span>GIFT?</span>
            <span>WISHLIST</span>
            <span>PRICE</span>
            <span>QUANTITY</span>
            <span>TOTAL</span>
          </div>
          <div className="cart-items">
            {carts &&
              carts.map((item) => <CartItem key={item._id} item={item} />)}
          </div>
          <div className="subtotal">
            <p>SUBTOTAL</p>
            <p>
              <b>
                <span>$</span>
                <span>{subtotal.toFixed(2)}</span>
              </b>
            </p>
          </div>
          <p style={{ fontWeight: "600" }}>Shipping and Delivery Time</p>
          <div className="address-total">
            <div className="address">
              <input type="text" placeholder="Select city" />
              <input type="number" placeholder="ZIP CODE" />
              <button>OK</button>
            </div>
            <div className="total">
              <p>TOTAL</p>
              <p>
                <b>
                  <span>$</span>
                  <span>{subtotal.toFixed(2)}</span>
                </b>
              </p>
            </div>
          </div>
          <p>
            <span style={{ fontWeight: "500" }}>DELIVERY ESTIMATE:</span> The
            time frame for receiving your product is the sum of the posting time
            (the time we need to obtain and post your order) plus the delivery
            time (the time the carrier needs to deliver it to your address). If
            your order includes more than one item, we may make up to two
            shipments. This will depend on the time needed to obtain the
            products. It’s important to note that we will not charge additional
            shipping fees, even if we make multiple shipments for your order.
          </p>
          <button className="checkout">CHECKOUT</button>
        </>
      )}
    </div>
  );
};

export default Cart;
