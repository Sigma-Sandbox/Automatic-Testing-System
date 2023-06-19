import axios from 'axios'
import { User } from 'entities/User'
import { deleteUserPath } from 'shared/const/queryPath'

export const fetchDeleteUser = async (option: User) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        accept: '*/*',
      },
    }
    const response = await axios.post(deleteUserPath, option, config)

    return response.statusText
  } catch (e) {
    console.log(e)
    return 'Ошибка при удалении соискателя'
  }
}
