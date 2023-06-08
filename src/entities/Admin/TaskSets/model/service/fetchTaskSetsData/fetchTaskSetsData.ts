import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { User } from 'entities/User'
import { getTaskSetPath, getUsersPath } from 'shared/const/queryPath'
import { TaskSet } from 'entities/Candidate/TestTask'

interface fetchTaskSetsDataProps {
  id?: number
}

export const fetchTaskSetsData = createAsyncThunk<TaskSet[], fetchTaskSetsDataProps, { rejectValue: string }>(
  'taskSets/getTaskSets',
  async (option, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          accept: '*/*',
        },
      }
      const response = await axios.post<TaskSet[]>(getTaskSetPath, option, config)
      if (!response.data) {
        throw new Error()
      }
      return response.data
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue('Ошибка при получении тестовых заданий')
    }
  }
)
