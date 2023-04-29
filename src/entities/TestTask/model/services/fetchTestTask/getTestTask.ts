import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {TestTaskPack} from '../../types/testTask'
import {testTaskActions} from '../../slice/testTaskSlice'

interface FetchTestTaskProps {}

export const fetchTestTask = createAsyncThunk<TestTaskPack, FetchTestTaskProps, {rejectValue: string}>(
  'testTask/getTestTask',
  async (testTask, thunkAPI) => {
    try {
      const response = await axios.get<TestTaskPack>('https://jsonplaceholder.typicode.com/posts')

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
