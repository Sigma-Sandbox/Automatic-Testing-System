import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ResultVacancyTaskSets, TaskSet, TestTask } from '../../types/testTask'
import { getTestTaskPath, getVacanciesPath } from 'shared/const/queryPath'
import { VacancyTest } from './../../types/testTask'
import { ResultVacancyTest } from 'entities/User'

interface FetchTestTaskProps {
  vacancy: ResultVacancyTaskSets
}

export const fetchTestTask = createAsyncThunk<
  { vacancy: ResultVacancyTaskSets; data: TaskSet[] },
  FetchTestTaskProps,
  { rejectValue: string }
>('testTask/getTestTask', async (testTask, thunkAPI) => {
  try {
    const response = await axios.post<VacancyTest>(getVacanciesPath, { id: testTask.vacancy.vacancyId })

    if (!response.data) {
      throw new Error()
    }
    return { data: response.data.taskSets, vacancy: testTask.vacancy }
  } catch (e) {
    console.log(e)
    return thunkAPI.rejectWithValue('get testtask Fail')
  }
})
