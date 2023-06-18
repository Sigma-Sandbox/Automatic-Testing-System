import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { testTaskActions } from 'entities/Candidate/TestTask/'
import { User, userActions } from 'entities/User'
import { UserRole, Vacancy } from 'core/enums'
// import { testTaskDataExample } from 'entities/Candidate/TestTask/model/consts/testTaskConsts'
import { getApplicantPath, getUsersPath } from 'shared/const/queryPath'

interface LoginByLinkProps {
  link: string
}

export const loginByLink = async (authData: LoginByLinkProps) => {
  try {
    const payload = { link: authData.link }
    const response = await axios.post<User[]>(getApplicantPath, payload)

    return response.data
  } catch (e) {
    console.log(e)
    return console.log('Ошибка при запросе. Проверьте правильность введеных данных')
  }
}
