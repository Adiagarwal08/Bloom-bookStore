import "../components/CartItem.css";
import like from "../images/like.png";
import like_filled from "../images/like_filled.png";
import gift_box from "../images/gift_box.png";
import useCartsContext from "../hooks/useCartsContext";
import { useState, useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";

const CartItem = ({ item }) => {
  const { dispatch } = useCartsContext();

  const [wishlist, setWishlist] = useState(item.wishlist);

  const { user } = useAuthContext();

  useEffect(() => {
    setWishlist(item.wishlist);
  }, [item.wishlist]);
  const total = item.price * item.quantity;

  const handleClick = async (quantity) => {
    if (!user) {
      return;
    }
    try {
      if (quantity === 0) {
        const deleteResponse = await fetch(
          process.env.REACT_APP_API_URI + `/api/carts/${item._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await deleteResponse.json();

        if (!deleteResponse.ok) throw new Error("Failed to delete item");

        console.log("Item deleted successfully", json);
        dispatch({ type: "REMOVE_CART", payload: item._id });
      } else {
        const updateResponse = await fetch(
          process.env.REACT_APP_API_URI + `/api/carts/${item._id}`,
          {
            method: "PATCH",
            body: JSON.stringify({ quantity: quantity }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (!updateResponse.ok)
          throw new Error("Failed to update item quantity");

        const updatedItem = await updateResponse.json();
        dispatch({ type: "UPDATE_CART", payload: updatedItem });
      }
      console.log("quantity updated");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="cart-item">
      <div className="type">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="item">
        <p>
          <b>{item.title}</b>
        </p>
        <p style={{ fontSize: "12px", textAlign: "left" }}>{item.author}</p>
      </div>
      <div className="gift">
        <input type="checkbox" />
        <img src={gift_box} alt="gift" />
      </div>
      <div className="wishlist">
        <img
          src={wishlist ? like_filled : like}
          alt="wishlist"
          style={{ cursor: "pointer" }}
        />
      </div>
      <p>
        <b>
          <span>$</span>
          <span>{item.price.toFixed(2)}</span>
        </b>
      </p>
      <div className="quantity">
        <p>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(item.quantity - 1)}
          >
            <b>-</b>
          </span>
          <span
            style={{
              border: "1px solid #000000",
              padding: "3px 20px",
              margin: "0px 5px",
            }}
          >
            {item.quantity}
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(item.quantity + 1)}
          >
            <b>+</b>
          </span>
        </p>
        <p style={{ cursor: "pointer" }} onClick={() => handleClick(0)}>
          <span>
            <b>X</b>
          </span>
          <span style={{ marginLeft: "5px" }}>REMOVE</span>
        </p>
      </div>
      <p>
        <b>
          <span>$</span>
          <span>{total.toFixed(2)}</span>
        </b>
      </p>
    </div>
  );
};

export default CartItem;
