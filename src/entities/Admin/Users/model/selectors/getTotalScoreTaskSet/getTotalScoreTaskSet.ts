import {StateSchema} from 'app/providers/StoreProvider'

export const getTotalScoreTaskSet = (taskSetId: number) => (state: StateSchema) => {
  return state.allUsersData.data.totalScoreTaskSet[taskSetId]
}
