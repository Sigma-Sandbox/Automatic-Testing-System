import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {User} from 'entities/User'
import {
  getProgTaskPath,
  getTaskSetPath,
  getTestTaskPath,
  getUsersPath,
} from 'shared/const/queryPath'
import {ProgTask} from 'entities/Candidate/TestTask'

interface fetchProgTaskListProps {}

export const fetchProgTaskList = createAsyncThunk<
  ProgTask[],
  fetchProgTaskListProps,
  {rejectValue: string}
>('progTaskList/getprogTaskList', async (option, thunkAPI) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        accept: '*/*',
      },
    }
    const response = await axios.post<ProgTask[]>(getProgTaskPath, option, config)
    if (!response.data) {
      throw new Error()
    }
    return response.data
  } catch (e) {
    console.log(e)
    return thunkAPI.rejectWithValue('Ошибка при получении списка тестов')
  }
})
