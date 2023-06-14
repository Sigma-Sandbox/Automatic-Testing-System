import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { User } from 'entities/User'
import { getQuestionsPath, getTaskSetPath, getTestTaskPath, getUsersPath } from 'shared/const/queryPath'
import { TestQuestion, TestTask } from 'entities/Candidate/TestTask'
import { testTaskAdminActions } from 'entities/Admin/TestTask'

export const fetchQuestions = async (option: { [key: string]: string }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        accept: '*/*',
      },
    }
    const response = await axios.post<TestQuestion[]>(getQuestionsPath, option, config)
    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (e) {
    return console.log(e, 'Ошибка при получении списка вопросов')
  }
}
