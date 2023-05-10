import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TaskSetPack, TaskSetPackSchema} from '../types/testTask'
import {fetchTestTask} from '../services/fetchTestTask/getTestTask'
import { testTaskDataExample } from '../consts/testTaskConsts'

const initialState: TaskSetPackSchema = {
  isLoading: false,
  error: undefined,
  data: testTaskDataExample,
}

export const testTaskSlice = createSlice({
  name: 'testTask',
  initialState,
  reducers: {
    setTestTaskData: (state, action: PayloadAction<TaskSetPack>) => {
      state.data = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestTask.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchTestTask.fulfilled, (state, action: PayloadAction<TaskSetPack>) => {
        state.isLoading = false
        // state.data = action.payload;
      })
      .addCase(fetchTestTask.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const {actions: testTaskActions} = testTaskSlice
export const {reducer: testTaskReducer} = testTaskSlice
