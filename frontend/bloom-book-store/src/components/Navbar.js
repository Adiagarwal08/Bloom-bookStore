import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../components/Navbar.css";
import searchlogo from "../images/search.png";
import logo from "../images/bloom_logo.png";
import useLogout from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();

  const { user } = useAuthContext();

  const user_letter = user ? user.email[0].toUpperCase() : "";

  const handleLogout = () => {
    logout();
  };

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/catalogue");
  };

  const handleLogo = () => {
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.9) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    setIsSearched(true);
  };

  const searchFunction = async (searchTitle) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URI + "/api/books"
      );

      if (!response.ok) throw new Error("Failed fetching books.");

      const json = await response.json();

      const bookWithTitle = json.find(
        (book) => book.title.toLowerCase() === searchTitle.toLowerCase()
      );

      if (!bookWithTitle) {
        alert("Book not found");
        return;
      }

      const id = bookWithTitle._id;
      navigate(`book/${id}`);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchFunction(searchTitle);
      setSearchTitle("");
      setIsSearched(false);
    }
  };

  return (
    <header>
      <div
        className={`navbar-container ${
          isHomePage && !isScrolled ? "transparent-container" : "scrolled"
        }`}
      >
        <img
          src={logo}
          alt="logo"
          className="logo"
          onClick={() => handleLogo()}
        />

        <nav className="nav-links">
          <Link to="/events">Events</Link>

          <Link to="/cart">Cart</Link>
          <button className="shop" onClick={() => handleClick()}>
            SHOP
          </button>
          {isSearched && (
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="search-input"
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchTitle(e.target.value)}
                value={searchTitle}
                onKeyDown={handleKeyPress} // ✅ Run search on Enter
              />
            </form>
          )}
          <button className="search-btn" onClick={() => handleSearch()}>
            <img src={searchlogo} alt="Search" className="search-icon" />
          </button>
          {user && (
            <button onClick={handleLogout} className="logout">
              Log out
            </button>
          )}
          {!user && <Link to="/login">Login</Link>}
          <div className="user-icon">
            {user ? user_letter : <i className="fa-solid fa-user"></i>}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
