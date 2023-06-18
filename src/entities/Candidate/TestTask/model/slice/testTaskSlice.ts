import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResultVacancyTaskSets, TaskSet, TaskSetPackSchema } from '../types/testTask'
// import { TaskSetPack } from '../types/testTask'
import { fetchTestTask } from '../services/fetchTestTask/getTestTask'
import { stat } from 'fs'
// import { testTaskDataExample } from '../consts/testTaskConsts'

const initialState: TaskSetPackSchema = {
  isLoading: false,
  error: undefined,
}

export const testTaskSlice = createSlice({
  name: 'testTask',
  initialState,
  reducers: {
    setTestTaskData: (state, action: PayloadAction<{ [key: number]: ResultVacancyTaskSets }>) => {
      state.data = action.payload
    },
    setDeleteTaskSet: (state, action: PayloadAction<{ vacancyId: number; taskSetId: string }>) => {
      if (state.data) {
        const newDataVacancy = { ...state.data[action.payload.vacancyId] }
        console.log(newDataVacancy, action.payload)
        newDataVacancy.taskSets = newDataVacancy.taskSets.filter((taskSet) => taskSet.id !== +action.payload.taskSetId)

        state.data[action.payload.vacancyId] = newDataVacancy
        console.log(newDataVacancy)
      }
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
        (state, action: PayloadAction<{ data: TaskSet[]; vacancy: ResultVacancyTaskSets }>) => {
          state.isLoading = false
          const vacancyWithTaskSest = action.payload.vacancy
          vacancyWithTaskSest.taskSets = action.payload.data
          if (state.data) {
            state.data[action.payload.vacancy.vacancyId] = action.payload.vacancy
          } else {
            state.data = { [action.payload.vacancy.vacancyId]: action.payload.vacancy }
          }
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
