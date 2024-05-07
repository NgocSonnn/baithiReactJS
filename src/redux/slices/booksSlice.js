import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BookApis } from "../../apis/bookApis";
import { message } from "antd";

export const getAllBook = createAsyncThunk(
  "books/getAllBook",
  async (params = {}) => {
    const response = await BookApis.getAllBook(params);
    return response.data;
  }
);
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await BookApis.fetchBook();
  return response.data;
});

export const fetchBooksById = createAsyncThunk(
  "books/fetchBooksById",
  async (bookId) => {
    const response = await BookApis.fetchBookById(bookId);
    return response.data;
  }
);

export const addBook = createAsyncThunk("books/addBook", async (book) => {
  const response = await BookApis.addBook(book);
  return response.data;
});

export const editBook = createAsyncThunk(
  "books/editBook",
  async ({ bookId, updatedBook }) => {
    try {
      const response = await BookApis.editBook(bookId, updatedBook);
      return response.data;
    } catch (error) {
      console.error("Error editing book:", error);
      throw error;
    }
  }
);
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId) => {
    try {
      await BookApis.deleteBook(bookId);
      return bookId;
    } catch (error) {
      console.error("Error deleting book:", error);
      throw error;
    }
  }
);
export const createNewBook = (task) => {
  return async (dispatch) => {
    try {
      await BookApis.createTask(task);
      message.success("Tạo mới task thành công!!!");
    } catch (error) {}
  };
};

const initialState = {
  books: [],
  status: "idle",
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooksById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchBooksById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.books = action.payload;
    });
    builder.addCase(fetchBooksById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(addBook.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.books.push(action.payload);
    });
    builder.addCase(addBook.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(editBook.fulfilled, (state, action) => {
      const updatedBook = action.payload;
      const index = state.books.findIndex((book) => book.id === updatedBook.id);
      if (index !== -1) {
        state.books[index] = updatedBook;
        message.success("Cập nhật thành công!!");
      }
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      const bookId = action.payload;
      state.books = state.books.filter((book) => book.id !== bookId);
      message.success("Xoá thành công!!");
    });
  },
});

export const bookReducer = booksSlice.reducer;
