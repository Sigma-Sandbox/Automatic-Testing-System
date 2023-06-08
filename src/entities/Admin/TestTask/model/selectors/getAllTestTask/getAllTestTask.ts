import { StateSchema } from 'app/providers/StoreProvider'

export const getAllTestTask = (state: StateSchema) => state.testTasksAdmin.data
