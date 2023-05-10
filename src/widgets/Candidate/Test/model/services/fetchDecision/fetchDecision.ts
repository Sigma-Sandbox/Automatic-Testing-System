import {createAsyncThunk} from '@reduxjs/toolkit'
import {StateSchema} from 'app/providers/StoreProvider'
import axios from 'axios'

interface fetchDecisionProps {
  decision: string
  idItem: string
  idTest: string
}

export const fetchDecision = createAsyncThunk<
  {},
  fetchDecisionProps,
  {rejectValue: string; state: StateSchema}
>('test/fetchDecision', async (decisionData, thunkAPI) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', decisionData)

    const {user, testUser} = thunkAPI.getState()
    const userid = user.authData?.id
    const testPackId = testUser.data.currentTestId

    // if (!response.data) {
    //     throw new Error();
    // }

    return response.data
  } catch (e) {
    console.log(e)
    return thunkAPI.rejectWithValue('Проверьте правильность введеных данных')
  }
})
