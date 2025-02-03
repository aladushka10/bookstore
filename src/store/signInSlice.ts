import { createSlice } from "@reduxjs/toolkit"

const storedUser = localStorage.getItem("user")
let parsedUser
try {
  parsedUser =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null
} catch (error) {
  parsedUser = null
}

const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    user: parsedUser,
    auth: JSON.parse(localStorage.getItem("auth") || "false"),
    username: localStorage.getItem("username") || null,
  },
  reducers: {
    signInUser(state, action) {
      const { email } = action.payload
      state.auth = true
      state.user = email
      state.username = action.payload.username
      localStorage.setItem("username", action.payload.username)
      localStorage.setItem("user", JSON.stringify(state.user))
      localStorage.setItem("auth", "true")
    },
    signOutUser(state) {
      state.auth = false
      state.user = null
      state.username = null
      localStorage.removeItem("username")
      localStorage.removeItem("user")
      localStorage.removeItem("auth")
    },
  },
})

export const { signInUser, signOutUser } = signInSlice.actions
export default signInSlice.reducer
