import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchVacanciesData} from '../service/fetchVacanciesData/fetchVacanciesData'

import {VacanciesSchema, Vacancy} from '../types/VacanciesTypes'

const initialState: VacanciesSchema = {
  isLoading: false,
  error: undefined,
  data: [],
}

export const VacanciesSlice = createSlice({
  name: 'Vacancies',
  initialState,
  reducers: {
    setAddVacancy: (state, action: PayloadAction<Vacancy>) => {
      state.data.push(action.payload)
    },
    setUpdateVacancy: (state, action: PayloadAction<Vacancy>) => {
      state.data = state.data.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload
        } else {
          return user
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacanciesData.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(fetchVacanciesData.fulfilled, (state, action: PayloadAction<Vacancy[]>) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchVacanciesData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

// Action creators are generated for each case reducer function
export const {actions: vacanciesActions} = VacanciesSlice
export const {reducer: vacanciesReducer} = VacanciesSlice
