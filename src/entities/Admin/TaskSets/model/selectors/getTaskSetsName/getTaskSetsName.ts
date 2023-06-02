import {StateSchema} from 'app/providers/StoreProvider'

export const getTaskSetsName = (state: StateSchema) => {
  return state.taskSets.data.map((taskSet) => taskSet.name)
}
