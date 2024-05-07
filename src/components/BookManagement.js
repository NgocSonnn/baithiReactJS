// BookManagement.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBooks,
  addBook,
  editBook,
  deleteBook,
} from "../redux/slices/booksSlice";
import BookList from "./BookList";

const BookManagement = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(fetchBooks())
      .then(() => setLoading(false))
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [dispatch]);

  const handleAddBook = () => {
    const newBook = { title, author, year };
    dispatch(addBook(newBook))
      .then(() => {
        setTitle("");
        setAuthor("");
        setYear("");
      })
      .catch((error) => setError(error.message));
  };

  const handleEditBook = () => {
    dispatch(
      editBook({
        bookId: books[editIndex].id,
        updatedBook: { title, author, year },
      })
    )
      .then(() => {
        setTitle("");
        setAuthor("");
        setYear("");
        setIsEditing(false);
      })
      .catch((error) => setError(error.message));
  };

  const handleEditClick = (index) => {
    const book = books[index];
    setTitle(book.title);
    setAuthor(book.author);
    setYear(book.year);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteBook = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  return (
    <div className="book-management">
      <h2>Book Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="book-management__form">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <label>Year:</label>
        <input
          type="number"
          value={year}
          min={1800}
          max={2023}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        {isEditing ? (
          <button type="submit" onClick={handleEditBook}>
            Edit Book
          </button>
        ) : (
          <button type="submit" onClick={handleAddBook}>
            Add Book
          </button>
        )}
      </div>
      <BookList
        books={books}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteBook}
      />
    </div>
  );
};

export default BookManagement;
