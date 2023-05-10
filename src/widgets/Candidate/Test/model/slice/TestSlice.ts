import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TestUser, TestUserSchema} from '../type/test'
import {fetchDecision} from '../services/fetchDecision/fetchDecision'
import {StatusItemTest} from '../const/testConst'
import {ProgAndTestTask} from 'entities/Candidate/TestTask'

const initialState: TestUserSchema = {
  data: {
    currentItem: 0,
    allCountItem: 0,
    statusItem: {},
    timeLimits: 1800,
    currentTestId: 1,
  },
  isLoading: false,
  error: null,
}

export const testUserSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setInitialData: (state, action: PayloadAction<{task: ProgAndTestTask; testPackId: number}>) => {
      const newData: TestUser = {
        currentItem: 0,
        allCountItem: action.payload.task.length,
        statusItem: {'0': {status: StatusItemTest.ENABLE, id: 'start'}},
        timeLimits: 1800,
        currentTestId: action.payload.testPackId,
      }
      for (let i = 1; i <= newData.allCountItem; i++) {
        newData.statusItem[i] = {status: StatusItemTest.ENABLE, id: action.payload.task[i - 1].id}
      }
      state.data = newData
    },
    setNewCurrentItem: (state, action: PayloadAction<number>) => {
      state.data.statusItem['0'] = {status: StatusItemTest.DISABLE, id: 'start'}
      if (action.payload > (state.data?.allCountItem || 3)) {
        state.data.currentItem = 1
      } else {
        if (action.payload !== 0) {
          state.data.currentItem = action.payload
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDecision.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchDecision.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(fetchDecision.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

// Action creators are generated for each case reducer function
export const {actions: testUserActions} = testUserSlice
export const {reducer: testUserReducer} = testUserSlice
