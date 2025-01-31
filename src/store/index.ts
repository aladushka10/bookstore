import { configureStore } from "@reduxjs/toolkit"
import activeSlice from "./activeSlice"
import paginationSlice from "./paginationSlice"
import postSlice from "./postSlice"
import selectedPostSlice from "./selectedPostSlice"

export default configureStore({
  reducer: {
    active: activeSlice,
    pagination: paginationSlice,
    posts: postSlice,
    selectedPost: selectedPostSlice,
  },
})
