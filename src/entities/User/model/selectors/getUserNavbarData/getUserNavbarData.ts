import {StateSchema} from 'app/providers/StoreProvider'

export const getUserNavbar = (state: StateSchema) => {
  if (state.user.authData) {
    return {
      firstname: state.user.authData.name,
      lasttname: state.user.authData.surname,
      position: Object.keys(state.user.authData.vacancies),
    }
  }
  return null
}
