import {StateSchema} from 'app/providers/StoreProvider'

export const getUserNavbar = (state: StateSchema) => {
  if (state.user.authData) {
    return {
      firstname: state.user.authData.name,
      lasttname: state.user.authData.surname,
      position: state.user.authData.position,
    }
  }
  return null
}
