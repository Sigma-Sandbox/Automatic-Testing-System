import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {testTaskActions} from 'entities/TestTask/model/slice/testTaskSlice'
import {User, userActions} from 'entities/User'
import { UserRole } from 'core/enums'
import { testTaskDataExample } from 'entities/TestTask/model/consts/testTaskConsts'

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, {rejectValue: string}>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    try {
      const response = await axios.get<User>('https://jsonplaceholder.typicode.com/users')

      // if (!response.data) {
      //     throw new Error();
      // }

      // Mock data
      thunkAPI.dispatch(
        userActions.setAuthData({
          id: 0,
          username: 'gigpopotam',
          firstname: 'Иван',
          lastname: 'Иванов',
          roles: UserRole.APPLICANT,
          position: 'Java-разработчик',
        })
      )
      thunkAPI.dispatch(
        testTaskActions.setTestTaskData(testTaskDataExample)
      )

      return response.data
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue('Проверьте правильность введеных данных')
    }
  }
)
