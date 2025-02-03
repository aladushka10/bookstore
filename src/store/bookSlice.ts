import { createSlice } from "@reduxjs/toolkit"
import { IBookCard } from "../types/types"

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [] as IBookCard[],
    loading: false,
    error: null,
    selectedBook: null,
    bookmarks: [] as IBookCard[],
    cart: [] as IBookCard[],
  },
  reducers: {
    selectBook(state, action) {
      state.selectedBook = action.payload
    },
    clearBook(state) {
      state.selectedBook = null
    },
    fetchBookStart(state) {
      state.loading = true
      state.error = null
    },
    fetchBookSuccess(state, action) {
      state.loading = false
      state.books = action.payload
    },
    fetchBookFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    toggleBookmark: (state, action) => {
      const index = state.bookmarks.findIndex(
        (state: any) => state.isbn13 === action.payload.isbn13
      )

      if (index === -1) {
        state.bookmarks.push(action.payload)
      } else {
        state.bookmarks.splice(index, 1)
      }
    },
    toggleCart: (state, action) => {
      const index = state.cart.findIndex(
        (state: any) => state.isbn13 === action.payload.isbn13
      )

      if (index === -1) {
        state.cart.push(action.payload)
      } else {
        state.cart.splice(index, 1)
      }
    },
  },
})

export const {
  selectBook,
  clearBook,
  fetchBookFail,
  fetchBookStart,
  fetchBookSuccess,
  toggleBookmark,
  toggleCart,
} = bookSlice.actions
export const fetchBooksAction = () => {
  return { type: "books/fetchBooks" }
}

export default bookSlice.reducer
