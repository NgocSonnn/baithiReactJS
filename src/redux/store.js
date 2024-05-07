import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./slices/booksSlice";

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export default store;
