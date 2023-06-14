import axios from 'axios'
import { ProgTask, TestQuestion, TestTask } from 'entities/Candidate/TestTask'
import { User } from 'entities/User'
import { addEntitiePath, updateEntitiePath } from 'shared/const/queryPath'

export const fetchTestTaskForm = async (option: TestTask, add = false) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        accept: '*/*',
      },
    }
    const response = await axios.post(add ? addEntitiePath : updateEntitiePath, option, config)
    console.log(response)

    return response.statusText
  } catch (e) {
    console.log(e)
    return 'Ошибка при отправе формы теста'
  }
}