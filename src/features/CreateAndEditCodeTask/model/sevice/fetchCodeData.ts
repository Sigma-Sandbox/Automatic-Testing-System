import axios from 'axios'
import { ProgTask } from 'entities/Candidate/TestTask'
import { User } from 'entities/User'
import { addEntitiePath, updateEntitiePath } from 'shared/const/queryPath'

export const fetchCodeData = async (option: ProgTask, add = false) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        accept: '*/*',
      },
    }
    const response = await axios.post(add ? addEntitiePath : updateEntitiePath, option, config)

    return response.statusText
  } catch (e) {
    console.log(e)
    return 'Ошибка при отправе формы задачи'
  }
}
