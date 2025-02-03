import { createSlice } from "@reduxjs/toolkit"

const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    registrationData: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  },
  reducers: {
    signUpUser(state, action) {
      state.registrationData = action.payload
      localStorage.setItem(
        "registrationData",
        JSON.stringify(state.registrationData)
      )
    },
  },
})

export const { signUpUser } = signUpSlice.actions
export default signUpSlice.reducer
