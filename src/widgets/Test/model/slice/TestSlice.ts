import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TestUser, TestUserSchema} from '../type/test'
import {fetchDecision} from '../services/fetchDecision/fetchDecision'
import {StatusItemTest} from '../const/testConst'

const initialState: TestUserSchema = {
  data: {
    currentItem: 0,
    allCountItem: 3,
    statusItem: {
      '0': StatusItemTest.ENABLE,
      '1': StatusItemTest.SUCCESS,
      '2': StatusItemTest.FALSE,
      '3': StatusItemTest.LOADER,
      '4': StatusItemTest.DISABLE,
    },
  },
  isLoading: false,
  error: null,
}

export const testUserSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setInitialData: (state, action: PayloadAction<TestUser>) => {
      state.data = action.payload
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
