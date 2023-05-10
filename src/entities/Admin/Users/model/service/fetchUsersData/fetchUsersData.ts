import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {UserSolution, UsersData} from '../../types/user'
import {User} from 'entities/Candidate/User'

interface FetchUsersDataProps {}

export const fetchUsersData = createAsyncThunk<
  {allUser: User[]; solution: UserSolution[]},
  FetchUsersDataProps,
  {rejectValue: string}
>('users/getUsersData', async (testTask, thunkAPI) => {
  try {
    const responseAllUser = await axios.get<User[]>('https://jsonplaceholder.typicode.com/posts')
    const responseUserSolution = await axios.get<UserSolution[]>(
      'https://jsonplaceholder.typicode.com/posts'
    )

    if (!responseAllUser.data || !responseUserSolution.data) {
      throw new Error()
    }

    return {allUser: responseAllUser.data, solution: responseUserSolution.data}
  } catch (e) {
    console.log(e)
    return thunkAPI.rejectWithValue('get testtask Fail')
  }
})
