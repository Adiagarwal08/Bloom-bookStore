import "../components/Book.css";

const Book = ({ book, onClick }) => {
  return (
    <div className="book-component" onClick={onClick}>
      <img src={book.image} alt={book.title} />
      <p style={{ fontWeight: "600" }}>{book.title}</p>
      <p>
        <span>$</span>
        <span>{book.price.toFixed(2)}</span>
      </p>
    </div>
  );
};

export default Book;
