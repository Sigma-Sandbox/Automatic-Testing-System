import {StateSchema} from 'app/providers/StoreProvider'

export const selectTestTask = (state: StateSchema) => state.testTask.data
