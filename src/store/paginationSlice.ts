import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.itbook.store/1.0/new`)
      if (!response.ok) {
        throw new Error("error")
      }
      const data = await response.json()
      return data
    } catch (error: any) {
      return rejectWithValue(error.message || "error")
    }
  }
)
const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    books: [],
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 9,
    // searchQueryTitle: "",
    // searchQuery: "",
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
    // setSearchQueryTitle: (state, action) => {
    //   state.searchQueryTitle = action.payload
    // },
    // setSearchQuery: (state, action) => {
    //   state.searchQuery = action.payload
    // },
    // setOrdering: (state, action) => {
    //   state.ordering = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false
        state.books = action.payload.books
        state.totalItems = action.payload.total
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})
export const { setPage } = paginationSlice.actions

export default paginationSlice.reducer
