import { createSlice } from "@reduxjs/toolkit"

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [] as IBookCard[],
    loading: false,
    error: null,
    selectedBook: null,
    bookmarks: [] as IBookCard[],
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
      const obj = action.payload
      const index = state.bookmarks.findIndex(
        (state: any) => state.isbn13 === obj.isbn13
      )

      if (index === -1) {
        state.bookmarks.push(obj)
      } else {
        state.bookmarks.splice(index, 1)
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
} = bookSlice.actions
export const fetchBooksAction = () => {
  return { type: "books/fetchBooks" }
}

export default bookSlice.reducer
