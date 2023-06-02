import axios from 'axios'
import {Vacancy} from 'entities/Admin/Vacancies'
import {addEntitiePath, updateEntitiePath} from 'shared/const/queryPath'

export const sendVacancyData = async (option: Vacancy, add = false) => {
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
    return 'Ошибка при отправе формы соискателя'
  }
}
