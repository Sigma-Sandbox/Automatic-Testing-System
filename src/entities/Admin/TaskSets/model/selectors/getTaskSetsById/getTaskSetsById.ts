import { StateSchema } from 'app/providers/StoreProvider'
import { TaskSet } from 'entities/Candidate/TestTask'

export const getTaskSetsById = (id: number) => (state: StateSchema) => {
  return state.taskSets.data.find((taskSet) => taskSet.id === id)
}
