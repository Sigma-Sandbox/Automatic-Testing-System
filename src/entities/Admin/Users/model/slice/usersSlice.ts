import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {UsersData, UserSolution, UsersSchema} from '../types/user'
import {fetchUsersData} from '../service/fetchUsersData/fetchUsersData'
import {User} from 'entities/Candidate/User'

const initialState: UsersSchema = {
  isLoading: false,
  error: undefined,
  data: {allUsers: [], userSolutions: []},
}

export const usersDataSlice = createSlice({
  name: 'usersData',
  initialState,
  reducers: {
    setUsersData: (state, action: PayloadAction<UsersData>) => {
      state.data = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersData.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchUsersData.fulfilled,
        (state, action: PayloadAction<{allUser: User[]; solution: UserSolution[]}>) => {
          state.isLoading = false
          // state.data = action.payload;
        }
      )
      .addCase(fetchUsersData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

// Action creators are generated for each case reducer function
export const {actions: usersDataActions} = usersDataSlice
export const {reducer: usersDataReducer} = usersDataSlice
