import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TestUser, TestUserSchema} from '../type/test'
import {fetchDecision} from '../services/fetchDecision/fetchDecision'
import {StatusItemTest} from '../const/testConst'
import {TestTaskSets, TestTaskSetsData} from 'entities/TestTask'

const initialState: TestUserSchema = {
  data: {
    currentItem: 0,
    allCountItem: 0,
    statusItem: {},
  },
  isLoading: false,
  error: null,
}

export const testUserSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setInitialData: (state, action: PayloadAction<TestTaskSetsData>) => {
      const newData: TestUser = {
        currentItem: 0,
        allCountItem: action.payload.length,
        statusItem: {'0': {status: StatusItemTest.ENABLE, id: 'start'}},
      }
      for (let i = 1; i <= newData.allCountItem; i++) {
        newData.statusItem[i] = {status: StatusItemTest.ENABLE, id: action.payload[i - 1].id}
      }
      state.data = newData
    },
    setNewCurrentItem: (state, action: PayloadAction<number>) => {
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
