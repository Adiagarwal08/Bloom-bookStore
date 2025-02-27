import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Home.css";
import handBook from "../images/hand-book.png";

const Home = () => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books/five");
      const json = await response.json();

      if (response.ok) {
        setBooks(json);
      }
    };

    fetchBooks();
  }, []);

  const navigate = useNavigate();

  const handleClick = (bookId) => {
    navigate(`book/${bookId}`);
  };

  const handleShop = () => {
    navigate("/catalogue");
  };
  return (
    <div className="home">
      <div className="image-div">
        <h1>BLOOM BOOKSHOP</h1>
        <p>
          Step Into Your Local Bookstore, Online: Expertly Curated,
          Community-Driven
        </p>
        <button className="shop-now" onClick={() => handleShop()}>
          SHOP NOW
        </button>
      </div>
      <div className="home-div">
        <h2>Who We Are</h2>
        <p>
          Welcome to Bloom, your favorite hometown bookstore now online! We're
          passionate about sharing the joy of reading and connecting book lovers
          everywhere.
        </p>
        <p>
          At Bloom, we’re more than booksellers – we’re community builders.
          Discover curated selections, lively events, and your next favorite
          book with us.Trust Bloom for expertly curated books, author talks, and
          workshops, all guided by passionate booksellers with decades of
          expertise.
        </p>
        <div className="quote-divider">
          <div className="line"></div>
          <span className="quote-mark">“</span>
          <div className="line"></div>
        </div>
        <p>
          <em>“There is no friend as loyal as a book.”</em>
        </p>
        <p style={{ marginTop: "-7px" }}>
          <b>-Ernest Hemingway</b>
        </p>
        <div className="quote-divider">
          <div className="line"></div>
          <span className="quote-mark">”</span>
          <div className="line"></div>
        </div>
        <div className="f-row">
          <img src={handBook} alt="book" className="handBook" />
          <div className="bloom-programming">
            <h2>Bloom Programming</h2>
            <p>
              To further community engagement, we host an array of literary and
              cultural events, including monthly book clubs for children and
              adults, an annual book fair, and an annual holiday gift bazaar.
            </p>
            <p>
              Inspired by London’s Gresham College — an institution providing
              free public lectures since 1597 — our mission is to foster the
              advancement of culture and knowledge. Bloom Programming events
              seek to entertain our sense of curiosity, inspire new areas of
              interest, and ultimately contribute to Tampa’s emergence as a
              cultural destination.
            </p>
            <br />
            <button className="learn-more">LEARN MORE</button>
          </div>
        </div>
        <br />
        <h2>What Booksellers Recommend</h2>
        <h4>Jane's Picks</h4>
        <p style={{ padding: "0 18vw", marginTop: "-7px" }}>
          <em>
            For the lover of thought-provoking fiction and timeless classics.
            Jane's picks are sure to challenge your mind and stir your emotions.
          </em>
        </p>
        <div className="home-books">
          {books &&
            books.map((book) => (
              <img
                key={book._id}
                src={book.image}
                alt={book.title}
                onClick={() => handleClick(book._id)}
              />
            ))}
        </div>
        <h4>Sarah's Picks</h4>
        <p style={{ padding: "0 18vw", marginTop: "-7px" }}>
          <em>
            For the adventure-seeker and mystery enthusiast. Sarah's selections
            will keep you on the edge of your seat with thrilling plots and
            unexpected twists.
          </em>
        </p>
        <div className="home-books">
          {books &&
            books.map((book) => (
              <img
                key={book._id}
                src={book.image}
                alt={book.title}
                onClick={() => handleClick(book._id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
