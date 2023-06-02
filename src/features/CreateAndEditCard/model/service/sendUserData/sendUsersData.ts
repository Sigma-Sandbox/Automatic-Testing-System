import axios from 'axios'
import {User} from 'entities/User'
import {addEntitiePath, updateEntitiePath} from 'shared/const/queryPath'

export const sendUsersData = async (option: User, add = false) => {
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
    return 'Ошибка при отправе формы соискателя'
  }
}
