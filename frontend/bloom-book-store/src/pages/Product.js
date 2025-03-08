import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Product.css";
import like from "../images/like.png";
import Book from "../components/Book";
import like_filled from "../images/like_filled.png";
import useAuthContext from "../hooks/useAuthContext";

const Product = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [notification, setNotification] = useState("");
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);

  const [fourBooks, setFourBooks] = useState([]);

  const { user } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${id}`);
        if (!response.ok) throw new Error("Failed to fetch book");

        const json = await response.json();
        setBook(json);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URI + "/api/wishlists",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch book");

        const data = await response.json();
        console.log("Wishlist items", data);
        setWishlistItems(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const existingWishlistItem = book
    ? wishlistItems.find((wishlistItem) => wishlistItem.title === book.title)
    : null;

  useEffect(() => {
    if (existingWishlistItem) {
      setAddedToWishlist(true);
    } else {
      setAddedToWishlist(false);
    }
  }, [existingWishlistItem]); // Runs only when wishlist items change

  useEffect(() => {
    const fetchFourBooks = async () => {
      try {
        const response = await fetch(`/api/books/four`);
        if (!response.ok) throw new Error("Failed to fetch book");

        const json = await response.json();
        setFourBooks(json);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchFourBooks();
  }, []);

  const handleClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const handleCart = async (item) => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      //✅ Step 1: fetch existing cart data
      const cartResponse = await fetch(
        process.env.REACT_APP_API_URI + "/api/carts",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!cartResponse.ok) throw new Error("Failed to fetch cart");
      const cartItems = await cartResponse.json();

      // ✅ Step 2: Check if Item Already Exists in Cart
      const existingItem = cartItems.find(
        (cartItem) => cartItem.title === item.title
      );

      if (existingItem) {
        // ✅ Step 3: If Item Exists, Update Quantity

        const updateResponse = await fetch(`/api/carts/${existingItem._id}`, {
          method: "PATCH",
          body: JSON.stringify({ quantity: existingItem.quantity + 1 }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!updateResponse.ok)
          throw new Error("Failed to update item quantity");
      } else {
        // ✅ Step 4: If Item Does Not Exist, Add It to Cart
        const cartItem = {
          image: item.image,
          title: item.title,
          author: item.author,
          price: item.price,
          quantity: 1,
          wishlist: addedToWishlist,
        };

        const response = await fetch(
          process.env.REACT_APP_API_URI + "/api/carts",
          {
            method: "POST",
            body: JSON.stringify(cartItem),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();
        console.log("Item added to cart", json);

        if (!response.ok) {
          throw new Error("No such item");
        }
      }

      setNotification(`"${item.title}" added to bag!`);
      setAddedToCart(true);
      console.log("new book added to cart");
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleWishlist = async (book) => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      if (addedToWishlist) {
        // delete book from wishlist
        const deleteResponse = await fetch(
          `/api/wishlists/${existingWishlistItem._id}`,
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
        setAddedToWishlist(false);

        // ✅ Also update the cart if the book exists in the cart
        const cartResponse = await fetch(
          process.env.REACT_APP_API_URI + "/api/carts",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (!cartResponse.ok) throw new Error("Failed to fetch cart");

        const cartItems = await cartResponse.json();
        const cartItem = cartItems.find(
          (cartItem) => cartItem.title === book.title
        );

        if (cartItem) {
          const updateCartResponse = await fetch(`/api/carts/${cartItem._id}`, {
            method: "PATCH",
            body: JSON.stringify({ wishlist: false }), // Set wishlist to false
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (!updateCartResponse.ok)
            throw new Error("Failed to update cart wishlist");
          console.log("Cart updated: Wishlist removed");
        }
      } else {
        // add book to wishlist
        const wishlistItem = {
          title: book.title,
        };

        const response = await fetch(
          process.env.REACT_APP_API_URI + "/api/wishlists",
          {
            method: "POST",
            body: JSON.stringify(wishlistItem),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();
        console.log("Item added to wishlist", json);

        if (!response.ok) throw new Error("No such item");

        setAddedToWishlist(true);

        // ✅ Also update the cart if the book exists in the cart
        const cartResponse = await fetch(
          process.env.REACT_APP_API_URI + "/api/carts",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (!cartResponse.ok) throw new Error("Failed to fetch cart");

        const cartItems = await cartResponse.json();
        const cartItem = cartItems.find(
          (cartItem) => cartItem.title === book.title
        );

        if (cartItem) {
          const updateCartResponse = await fetch(`/api/carts/${cartItem._id}`, {
            method: "PATCH",
            body: JSON.stringify({ wishlist: true }), // Set wishlist to true
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (!updateCartResponse.ok)
            throw new Error("Failed to update cart wishlist");
          console.log("Cart updated: Wishlist added");
        }
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const MAX_LENGTH = 400; // Set max length for the first paragraph

  if (!book) return <p>Loading...</p>;

  const overview = book.overview || ""; // Handle undefined case
  let firstPart = overview;
  let secondPart = "";

  // Split at the nearest period before MAX_LENGTH
  if (overview.length > MAX_LENGTH) {
    const splitIndex = overview.lastIndexOf(".", MAX_LENGTH); // Find the nearest period before MAX_LENGTH
    if (splitIndex !== -1) {
      firstPart = overview.slice(0, splitIndex + 1); // Include the period
      secondPart = overview.slice(splitIndex + 1).trim(); // Trim to remove leading space
    }
  }

  return (
    <div className="product">
      {notification && <div className="notification">{notification}</div>}
      <div className="product-split">
        <div className="product-left">
          <img src={book.image} alt="book" className="book-icon" />
          <h3>DETAILS</h3>
          <p>
            <span>Author: </span>
            <span>{book.author}</span>
          </p>
          <p>
            <span>ISBN: </span>
            <span>{book.isbn}</span>
          </p>
          <p>
            <span>Hardcover: </span>
            <span>{book.hardcover} </span>
            <span>pages.</span>
          </p>
          <p>
            <span>Size: </span>
            <span>{book.size}</span>
          </p>
          <p>
            <span>Font size: </span>
            <span>{book.font} </span>
            <span>pt Arial</span>
          </p>
          <h3>WHAT THE CRITICS ARE SAYING</h3>
          <p>{book.critics}</p>
          <h3>BLOOMER REVIEWS</h3>
          <div className="rating-container">
            <div className="stars">
              {Array(5)
                .fill("★")
                .map((star, index) => (
                  <span key={index} className="star">
                    {star}
                  </span>
                ))}
            </div>
            <span className="rating-text">
              5/5 <span className="review-count">(24 BLOOMERS)</span>
            </span>
            <span className="see-more">see more</span>
          </div>
          <h3>SHARE YOUR OPINION</h3>
          <input className="opinion" />
        </div>
        <div className="product-right">
          <h2>{book.title}</h2>
          <p>
            <span>AUTHOR: </span>
            <span>{book.author}</span>
          </p>
          <p>
            <span>EDITOR: </span>
            <span>{book.editor}</span>
          </p>
          <p className="shipping">Shipping and Delivery Time</p>
          <input placeholder="ZIP CODE" className="zip" />
          <button className="zip-ok">OK</button>
          <p className="price">
            <span>$</span>
            <span>{book.price.toFixed(2)}</span>
          </p>
          <div className="like">
            <button
              className={`add-to-cart ${addedToCart ? "added" : ""}`}
              onClick={() => handleCart(book)}
              disabled={addedToCart}
            >
              {addedToCart ? "ADDED TO BAG" : "ADD TO CART"}
            </button>
            <button
              className="like-button"
              onClick={() => handleWishlist(book)}
            >
              {addedToWishlist ? (
                <img
                  src={like_filled}
                  alt="wishlisted"
                  className="wishlst-icon"
                />
              ) : (
                <img src={like} alt="like" className="like-icon" />
              )}
            </button>
            <span className="wishlist">
              {addedToWishlist ? "ADDED TO WISHLIST" : "ADD TO WISHLIST"}
            </span>
          </div>
          <h3>OVERVIEW</h3>
          <p>{firstPart}</p>
          {secondPart && <p>{secondPart}</p>}
          <h3>ABOUT THE AUTHOR</h3>
          <p>{book.about_the_author}</p>
        </div>
      </div>
      <h2>You May Also Like</h2>

      <div className="four-books">
        {fourBooks &&
          fourBooks.map((book) => (
            <Book
              key={book._id}
              book={book}
              onClick={() => handleClick(book._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Product;
