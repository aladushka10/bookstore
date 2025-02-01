import { configureStore } from "@reduxjs/toolkit"
import activeSlice from "./activeSlice"
import paginationSlice from "./paginationSlice"
import bookSlice from "./bookSlice"
import selectedBookSlice from "./selectedBookSlice"
import searchSlice from "./searchSlice"

export default configureStore({
  reducer: {
    active: activeSlice,
    pagination: paginationSlice,
    books: bookSlice,
    selectedBook: selectedBookSlice,
    search: searchSlice,
  },
})
