import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { User } from 'entities/User'
import {
  addEntitiePath,
  getQuestionsPath,
  getTaskSetPath,
  getTestTaskPath,
  getUsersPath,
  updateEntitiePath,
} from 'shared/const/queryPath'
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

export const fetchNewQuestion = async (option: TestQuestion, add = false) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        accept: '*/*',
      },
    }
    const response = await axios.post<TestQuestion>(add ? addEntitiePath : updateEntitiePath, option, config)

    return response.statusText
  } catch (e) {
    return console.log(e, 'Ошибка при получении списка вопросов')
  }
}
