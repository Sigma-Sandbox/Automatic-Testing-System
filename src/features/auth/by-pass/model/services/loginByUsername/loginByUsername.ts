import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { testTaskActions } from 'entities/Candidate/TestTask/'
import { User, userActions } from 'entities/User'
import { UserRole, Vacancy } from 'core/enums'
// import { testTaskDataExample } from 'entities/Candidate/TestTask/model/consts/testTaskConsts'
import { getUsersPath } from 'shared/const/queryPath'

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<User[], LoginByUsernameProps, { rejectValue: string }>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    try {
      const payload = { email: authData.username, password: authData.password }
      const response = await axios.post<User[]>('http://localhost:3000/api/get/user', payload)

      thunkAPI.dispatch(userActions.setAuthData(response.data[0]))
      // thunkAPI.dispatch(testTaskActions.setTestTaskData(testTaskDataExample))

      return response.data
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue('Ошибка при запросе. Проверьте правильность введеных данных')
    }
  }
)
