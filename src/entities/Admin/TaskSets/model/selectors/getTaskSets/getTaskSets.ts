import { StateSchema } from 'app/providers/StoreProvider'

export const getTaskSets = (state: StateSchema) => {
  return state.taskSets.data
}
