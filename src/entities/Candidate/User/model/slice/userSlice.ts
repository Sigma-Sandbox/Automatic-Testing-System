import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserSchema, User } from '../types/user'

const initialState: UserSchema = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
    },
    initAuthData: (state) => {},
    logout: (state) => {
      state.authData = undefined
    },
  },
})

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
