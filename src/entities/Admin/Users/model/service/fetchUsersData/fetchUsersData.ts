import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {UserSolution, UsersData} from '../../types/users'
import {User} from 'entities/User'
import {statusLoadSolution} from '../../consts/usersDataConsts'
import {getUsersPath} from 'shared/const/queryPath'

interface FetchUsersDataProps {}

export const fetchUsersData = createAsyncThunk<User[], FetchUsersDataProps, {rejectValue: string}>(
  'users/getUsersData',
  async (option, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          accept: '*/*',
        },
      }
      const responseAllUser = await axios.post<User[]>(getUsersPath, option, config)
      if (!responseAllUser.data) {
        throw new Error()
      }

      return responseAllUser.data
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue('Ошибка при получении списка соискателей')
    }
  }
)
