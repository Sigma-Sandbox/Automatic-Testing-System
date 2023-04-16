import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { testTaskActions } from 'entities/TestTask/model/slice/testTaskSlice'
import { User, UserRole, userActions } from 'entities/User'

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  { rejectValue: string }
>('login/loginByUsername', async (authData, thunkAPI) => {
  try {
    const response = await axios.get<User>(
      'https://jsonplaceholder.typicode.com/users'
    )

    // if (!response.data) {
    //     throw new Error();
    // }

    // Mock data
    thunkAPI.dispatch(
      userActions.setAuthData({
        id: '0',
        username: 'gigpopotam',
        firstname: 'Myname',
        lastname: 'Mylonglastname',
        roles: UserRole.USER,
        position: 'Java-разработчик',
      })
    )
    thunkAPI.dispatch(
      testTaskActions.setTestTaskData({
        id: '1',
        name: 'Java',
        timeLimits: 'до 5 мая',
        data: [
          {
            description: 'Cool Task',
            taskCount: 6,
            timeLimits: '24 часа',
            name: 'Java padavan',
          },
          {
            description: 'Cool Task',
            taskCount: 6,
            timeLimits: '23 аперля 2023',
            name: 'Soft skills',
          },
        ],
      })
    )

    return response.data
  } catch (e) {
    console.log(e)
    return thunkAPI.rejectWithValue('Проверьте правильность введеных данных')
  }
})
