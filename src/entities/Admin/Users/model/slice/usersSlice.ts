import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UsersData, UserSolution, UsersSchema } from '../types/users'
import { fetchUsersData } from '../service/fetchUsersData/fetchUsersData'
import { User } from 'entities/User'

const initialState: UsersSchema = {
  isLoading: false,
  error: undefined,
  data: { allUsers: [], allSolution: {}, totalScoreTaskSet: {} },
}

export const usersDataSlice = createSlice({
  name: 'usersData',
  initialState,
  reducers: {
    setInitialUsersData: (state, action: PayloadAction<UsersData>) => {
      state.data = action.payload
    },
    setScoreTaskSet: (state, action: PayloadAction<{ taskSetId: number; totalScore: number }>) => {
      state.data.totalScoreTaskSet[action.payload.taskSetId] = action.payload.totalScore
    },
    setUpdateUsers: (state, action: PayloadAction<User>) => {
      state.data.allUsers = state.data.allUsers.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload
        } else {
          return user
        }
      })
    },
    setAddUser: (state, action: PayloadAction<User>) => {
      state.data.allUsers.push(action.payload)
    },
    setDeleteUser: (state, action: PayloadAction<User>) => {
      state.data.allUsers = state.data.allUsers.filter((user) => {
        if (user.id === action.payload.id) {
          return false
        } else {
          return true
        }
      })
    },
    setUserSolution: (
      state,
      action: PayloadAction<{
        userId: number
        taskSetId: number
        solutionTaskset: UserSolution[]
      }>
    ) => {
      const { userId, taskSetId, solutionTaskset } = action.payload

      if (state.data.allSolution[userId]) {
        state.data.allSolution[userId][taskSetId] = solutionTaskset
      } else {
        state.data.allSolution[userId] = { [taskSetId]: solutionTaskset }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersData.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchUsersData.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false
        state.data.allUsers = action.payload
        console.log('fecth users', action.payload)
      })
      .addCase(fetchUsersData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

// Action creators are generated for each case reducer function
export const { actions: usersDataActions } = usersDataSlice
export const { reducer: usersDataReducer } = usersDataSlice
