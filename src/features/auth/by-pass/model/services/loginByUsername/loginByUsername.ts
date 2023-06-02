import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { testTaskActions } from 'entities/Candidate/TestTask/'
import { User, userActions } from 'entities/User'
import { UserRole, Vacancy } from 'core/enums'
import { testTaskDataExample } from 'entities/Candidate/TestTask/model/consts/testTaskConsts'

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
          name: 'Иван',
          surname: 'Иванов',
          accessRights: UserRole.EMPLOYEE,
          vacancies: [{ vacancyId: 1, vacancyName: Vacancy.JAVA_JUNIOR, userSolutions: [] }],
          email: 'dkjfa@gmail.com',
          password: 'dalkjfa',
          startLinkTimestamp: 1234,
          endLinkTimestamp: 1234,
          actualLink: 'dzc',
        })
      )
      thunkAPI.dispatch(testTaskActions.setTestTaskData(testTaskDataExample))

      return response.data
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue('Ошибка при запросе. Проверьте правильность введеных данных')
    }
  }
)
