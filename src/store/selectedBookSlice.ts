import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getBookInfo = createAsyncThunk(
  "books/getBookInfo",
  async (objectFromBooksPage, { rejectWithValue }) => {
    const { isbn13 }: any = objectFromBooksPage
    try {
      const response = await fetch(
        `https://api.itbook.store/1.0/books/${isbn13}`
      )
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

const selectedBookSlice = createSlice({
  name: "selectedBook",
  initialState: {
    book: {
      error: "",
      title: "",
      subtitle: "",
      authors: "",
      publisher: "",
      isbn13: "",
      pages: "",
      year: "",
      rating: "",
      desc: "",
      price: "",
      image: "",
    },
    previousBook: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setBookInfo(state, action) {
      state.book = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookInfo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getBookInfo.fulfilled, (state, action) => {
        state.loading = false
        state.book = action.payload
      })
      .addCase(getBookInfo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})
export const { setBookInfo } = selectedBookSlice.actions

export default selectedBookSlice.reducer
