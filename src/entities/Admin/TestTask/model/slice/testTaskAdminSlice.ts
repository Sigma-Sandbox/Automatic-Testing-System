import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchTestTaskList} from '../service/fetchTestTaskList/fetchTestTaskList'
import {User} from 'entities/User'
import {TaskSet, TestTask} from 'entities/Candidate/TestTask'
import {TestTaskSchema} from '../type/testTaskType'

const initialState: TestTaskSchema = {
  isLoading: false,
  error: undefined,
  data: [],
}

export const testTaskAdminSlice = createSlice({
  name: 'taskSets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestTaskList.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchTestTaskList.fulfilled, (state, action: PayloadAction<TestTask[]>) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchTestTaskList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

// Action creators are generated for each case reducer function
export const {actions: testTaskAdminActions} = testTaskAdminSlice
export const {reducer: testTaskAdminReducer} = testTaskAdminSlice
