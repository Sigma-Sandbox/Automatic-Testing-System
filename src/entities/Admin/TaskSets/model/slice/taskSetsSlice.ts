import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchTaskSetsData } from '../service/fetchTaskSetsData/fetchTaskSetsData'
import { User } from 'entities/User'
import { TaskSet } from 'entities/Candidate/TestTask'
import { TaskSetsSchema } from '../types/taskSetsTypes'

const initialState: TaskSetsSchema = {
  isLoading: false,
  error: undefined,
  data: [],
}

export const taskSetsSlice = createSlice({
  name: 'taskSets',
  initialState,
  reducers: {
    setAddTaskSet: (state, action: PayloadAction<TaskSet>) => {
      state.data.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskSetsData.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchTaskSetsData.fulfilled, (state, action: PayloadAction<TaskSet[]>) => {
        state.isLoading = false

        const newTaskSets: TaskSet[] = []

        action.payload.forEach((taskSet) => {
          if (state.data.find((t) => t.id === taskSet.id)) {
          } else {
            newTaskSets.push(taskSet)
          }
        })

        state.data.push(...newTaskSets)
      })
      .addCase(fetchTaskSetsData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

// Action creators are generated for each case reducer function
export const { actions: taskSetsActions } = taskSetsSlice
export const { reducer: taskSetsReducer } = taskSetsSlice
