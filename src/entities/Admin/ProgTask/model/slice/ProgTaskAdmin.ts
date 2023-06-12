import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchProgTaskList } from '../service/fetchProgTaskList/fetchProgTaskList'
import { ProgTask, TaskSet, TestTask } from 'entities/Candidate/TestTask'
import { ProgTaskSchema } from '../type/progTaskSlice'

const initialState: ProgTaskSchema = {
  isLoading: false,
  error: undefined,
  data: [],
}

export const ProgTaskAdminSlice = createSlice({
  name: 'taskSets',
  initialState,
  reducers: {
    setAddProgTask: (state, action: PayloadAction<ProgTask>) => {
      state.data.push(action.payload)
    },
    setUpdateProgTask: (state, action: PayloadAction<ProgTask>) => {
      state.data = state.data.map((progTask) => {
        if (progTask.id === action.payload.id) {
          return action.payload
        } else {
          return progTask
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgTaskList.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchProgTaskList.fulfilled, (state, action: PayloadAction<ProgTask[]>) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchProgTaskList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

// Action creators are generated for each case reducer function
export const { actions: progTaskAdminActions } = ProgTaskAdminSlice
export const { reducer: progTaskAdminReducer } = ProgTaskAdminSlice
