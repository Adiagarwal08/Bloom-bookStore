import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Catalogue.css";
import Book from "../components/Book";

const Catalogue = () => {
  const [booksC, setBooksC] = useState([]);
  const [sortedBooks, setSortedBooks] = useState([]); // Sorted books
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("new-to-old"); // Default sort
  const booksPerPage = 16; // Show 16 books per page

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooksC = async () => {
      try {
        const response = await fetch("/api/books");
        if (!response.ok) throw new Error("Failed to fetch books");
        const json = await response.json();
        setBooksC(json);
      } catch (error) {
        console.log("Error fetching books ", error);
      }
    };
    fetchBooksC();
  }, []);

  // Sorting function
  useEffect(() => {
    let sortedArray = [...booksC];

    switch (sortOption) {
      case "new-to-old":
        sortedArray.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ); // Latest first
        break;
      case "old-to-new":
        sortedArray.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        ); // Oldest first
        break;
      case "high-to-low":
        sortedArray.sort((a, b) => b.price - a.price); // High price first
        break;
      case "low-to-high":
        sortedArray.sort((a, b) => a.price - b.price); // Low price first
        break;
      default:
        break;
    }

    setSortedBooks(sortedArray);
  }, [booksC, sortOption]);

  // Pagination logic
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handleClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
    }
  };

  return (
    <div className="catalogue">
      <h1>Books</h1>

      <div className="sorting">
        <label>Sort by:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="new-to-old">Date (New to Old)</option>
          <option value="old-to-new">Date (Old to New)</option>
          <option value="high-to-low">Price (High to Low)</option>
          <option value="low-to-high">Price (Low to High)</option>
        </select>
      </div>

      <div className="catalogue-books">
        {currentBooks.map((book) => (
          <Book
            key={book._id}
            book={book}
            onClick={() => handleClick(book._id)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lt;
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalogue;
