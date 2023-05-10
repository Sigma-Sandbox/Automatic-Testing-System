import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {TaskSetPack} from '../../types/testTask'

interface FetchTestTaskProps {}

export const fetchTestTask = createAsyncThunk<TaskSetPack, FetchTestTaskProps, {rejectValue: string}>(
  'testTask/getTestTask',
  async (testTask, thunkAPI) => {
    try {
      const response = await axios.get<TaskSetPack>('https://jsonplaceholder.typicode.com/posts')

      if (!response.data) {
        throw new Error()
      }

      return response.data
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue('get testtask Fail')
    }
  }
)
