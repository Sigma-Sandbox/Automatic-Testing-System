import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {User} from 'entities/User'
import {getTaskSetPath, getTestTaskPath, getUsersPath} from 'shared/const/queryPath'
import {TestTask} from 'entities/Candidate/TestTask'

interface fetchTestTaskListProps {}

export const fetchTestTaskList = createAsyncThunk<
  TestTask[],
  fetchTestTaskListProps,
  {rejectValue: string}
>('testTaskList/getTestTaskList', async (option, thunkAPI) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        accept: '*/*',
      },
    }
    const response = await axios.post<TestTask[]>(getTestTaskPath, option, config)
    if (!response.data) {
      throw new Error()
    }
    return response.data
  } catch (e) {
    console.log(e)
    return thunkAPI.rejectWithValue('Ошибка при получении списка тестов')
  }
})
