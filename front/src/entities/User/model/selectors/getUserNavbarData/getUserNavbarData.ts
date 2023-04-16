import { StateSchema } from 'app/providers/StoreProvider'

export const getUserNavbar = (state: StateSchema) => {
  if (state.user.authData) {
    return {
      firstname: state.user.authData.firstname,
      lasttname: state.user.authData.lastname,
      position: state.user.authData.position,
    }
  }
  return null
}
