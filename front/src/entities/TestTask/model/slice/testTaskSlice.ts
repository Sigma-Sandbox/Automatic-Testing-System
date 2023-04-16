import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TestTask, TestTaskSchema } from '../types/testTask'
import { fetchTestTask } from '../services/fetchTestTask/getTestTask'

const initialState: TestTaskSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
}

export const testTaskSlice = createSlice({
  name: 'testTask',
  initialState,
  reducers: {
    setTestTaskData: (state, action: PayloadAction<TestTask>) => {
      state.data = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestTask.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchTestTask.fulfilled,
        (state, action: PayloadAction<TestTask>) => {
          state.isLoading = false
          // state.data = action.payload;
        }
      )
      .addCase(fetchTestTask.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { actions: testTaskActions } = testTaskSlice
export const { reducer: testTaskReducer } = testTaskSlice
