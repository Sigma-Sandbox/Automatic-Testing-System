import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TestTaskPack, TestTaskSchema} from '../types/testTask'
import {fetchTestTask} from '../services/fetchTestTask/getTestTask'

const initialState: TestTaskSchema = {
  isLoading: false,
  error: undefined,
  data: {
    id: '1',
    name: 'Java',
    timeLimits: 'до 5 мая',
    description: '',
    data: [
      {
        description: 'Cool Task',
        taskCount: 6,
        timeLimits: '24 часа',
        name: 'Java padavan',
        id: '1',
        data: [
          {
            id: '0',
            description: 'Написать очень легкую функцию',
            timeLimits: null,
            name: 'Функция',
          },
          {
            id: '1',
            description: 'Написать функцию',
            timeLimits: null,
            name: 'Функция',
          },
          {
            id: '2',
            description: 'Написать сложную функцию',
            timeLimits: null,
            name: 'Функция',
          },
          {
            id: '3',
            description: 'Написать очень сложную функцию',
            timeLimits: null,
            name: 'Функция',
          },
        ],
      },
    ],
  },
}

export const testTaskSlice = createSlice({
  name: 'testTask',
  initialState,
  reducers: {
    setTestTaskData: (state, action: PayloadAction<TestTaskPack>) => {
      state.data = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestTask.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchTestTask.fulfilled, (state, action: PayloadAction<TestTaskPack>) => {
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
