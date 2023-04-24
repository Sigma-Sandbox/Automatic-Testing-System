import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

interface fetchDecisionProps {
  decision: string
  idItem: string
  idTest: string
}

export const fetchDecision = createAsyncThunk<{}, fetchDecisionProps, {rejectValue: string}>(
  'test/fetchDecision',
  async (decisionData, thunkAPI) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', decisionData)

      // if (!response.data) {
      //     throw new Error();
      // }

      return response.data
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue('Проверьте правильность введеных данных')
    }
  }
)
