import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IBookCard } from "../types/types"

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
    books: [] as IBookCard[],
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 9,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
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
