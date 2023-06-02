import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {User} from 'entities/User'
import {getVacanciesPath, getUsersPath} from 'shared/const/queryPath'
import {Vacancy} from '../../types/VacanciesTypes'

interface fetchTaskSetsDataProps {}

export const fetchVacanciesData = createAsyncThunk<
  Vacancy[],
  fetchTaskSetsDataProps,
  {rejectValue: string}
>('vacancies/getVacancies', async (option, thunkAPI) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        accept: '*/*',
      },
    }
    const response = await axios.post<Vacancy[]>(getUsersPath, option, config)

    // const response = await axios.post<Vacancy[]>(getVacanciesPath, option, config)
    // if (!response.data) {
    //   throw new Error()
    // }
    const mockData: Vacancy[] = [
      {id: 1, name: 'java', taskSetIds: [1, 2]},
      {id: 2, name: 'js', taskSetIds: [1, 2, 3]},
      {id: 3, name: 'js-2019', taskSetIds: [2, 3, 4]},
      {id: 4, name: 'java-2019', taskSetIds: [1, 2, 4]},
      {id: 5, name: 'js-winter2020', taskSetIds: [4]},
      {id: 6, name: 'java-november2022', taskSetIds: [1]},
      {id: 7, name: 'pr-manager january', taskSetIds: [4]},
      {id: 8, name: 'js-2108', taskSetIds: [2]},
    ]

    return mockData
  } catch (e) {
    console.log(e)
    return thunkAPI.rejectWithValue('Ошибка при получении списка вакансий')
  }
})
