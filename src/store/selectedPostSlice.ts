import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getPostInfo = createAsyncThunk(
  "posts/getPostInfo",
  async (objectFromPostsPage, { rejectWithValue }) => {
    const { id }: any = objectFromPostsPage
    try {
      const response = await fetch(
        `https://studapi.teachmeskills.by/blog/posts/${id}`
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

const selectedPostSlice = createSlice({
  name: "selectedPost",
  initialState: {
    post: {
      id: 0,
      image: "",
      text: "",
      date: "",
      lesson_num: 0,
      title: "",
      description: "",
      author: 0,
    },
    previousPost: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setPostInfo(state, action) {
      state.post = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostInfo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getPostInfo.fulfilled, (state, action) => {
        state.loading = false
        state.post = action.payload
      })
      .addCase(getPostInfo.rejected, (state, action) => {
        ;(state.loading = false), (state.error = action.payload as string)
      })
  },
})
export const { setPostInfo } = selectedPostSlice.actions

export default selectedPostSlice.reducer
