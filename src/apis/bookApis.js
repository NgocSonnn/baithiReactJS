import axios from "axios";

export const BookApis = {
  getAllBook: async (params) => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}books`, {
      params: params,
    });
    return response;
  },
  fetchBookById: async (bookId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}books/${bookId}`
    );
    return response.data;
  },
  fetchBook: async () => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}books`);
    return response.data;
  },
  addBook: async (book) => {
    return await axios.post(`${process.env.REACT_APP_BE_URL}books`, book);
  },

  editBook: async (bookId, updatedBook) => {
    return await axios.patch(
      `${process.env.REACT_APP_BE_URL}books/${bookId}`,
      updatedBook
    );
  },

  deleteBook: async (bookId) => {
    return await axios.delete(`${process.env.REACT_APP_BE_URL}books/${bookId}`);
  },
};
