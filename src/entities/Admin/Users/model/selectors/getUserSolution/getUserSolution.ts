import {StateSchema} from 'app/providers/StoreProvider'

export const getUserSolution = (userId: number) => (state: StateSchema) => {
  return state.allUsersData.data.allSolution[userId]
}
