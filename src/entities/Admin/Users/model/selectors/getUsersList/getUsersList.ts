import {StateSchema} from 'app/providers/StoreProvider'

export const getUsersList = (state: StateSchema) => {
  if (state.allUsersData.data?.allUsers) {
    return state.allUsersData.data?.allUsers
  }
  return null
}
