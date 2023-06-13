import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserSchema, User } from '../types/user'
import { UserRole } from 'core/enums'

const initialState: UserSchema = {
  authData: {
    id: 12,
    surname: 'surname',
    name: 'name',
    accessRights: UserRole.APPLICANT,
    email: 'string@mail.eu',
    // password?: string,
    actualLink: 'stringonlink',
    startLinkTimestamp: 'startlinkTimestamp',
    endLinkTimestamp: 'endlinkTimestamp',
    vacancies: [],
  },
}

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
