import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store/store"
import { post } from "../../http/instanceMethods"
import {
  clearLocalStorage,
  getAuthTokenFromLocal,
  setAuthTokenAtLocal,
} from "../../utils/storage-utils"
import { getUserDetails } from "./auth-helper"
import { LoginResponse } from "./auth-type"

const name = "auth"

export const fetchSomeData = createAsyncThunk(
  `${name}/dummy`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await post("/feed/post", {
        title: "My",
        content: "This is my post content",
      })
      return response
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const slice = createSlice({
  name,
  initialState: {
    user: getUserDetails(getAuthTokenFromLocal()),
  },
  reducers: {
    resetUserData: (state) => {
      state.user = {
        email: "",
        userId: 0,
        username: "",
        iat: 0,
        exp: 0,
        accessToken: "",
      }
      clearLocalStorage()
    },
    setUserData: (state, action: PayloadAction<LoginResponse>) => {
      state.user = getUserDetails(action.payload)
      setAuthTokenAtLocal(action.payload)
    },
  },
  extraReducers: {},
})

export const { setUserData, resetUserData } = slice.actions
export const authState = (state: RootState) => state.authData
export default slice.reducer
