import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {testTaskActions} from 'entities/Candidate/TestTask/'
import {User, userActions} from 'entities/Candidate/User'
import {UserRole} from 'core/enums'
import {testTaskDataExample} from 'entities/Candidate/TestTask/model/consts/testTaskConsts'

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
      console.log(thunkAPI.getState())

      // Mock data
      thunkAPI.dispatch(
        userActions.setAuthData({
          id: 0,
          name: 'Иван',
          surname: 'Иванов',
          accessRights: UserRole.APPLICANT,
          position: 'Java-разработчик',
          email: 'dkjfa@gmail.com',
          password: 'dalkjfa',
          startLinkTimestamp: 1234,
          endLinkTimestamp: 1234,
          actualLink: 'dzc',
          taskSets: testTaskDataExample,
        })
      )
      thunkAPI.dispatch(testTaskActions.setTestTaskData(testTaskDataExample))

      return response.data
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue('Проверьте правильность введеных данных')
    }
  }
)
