import { StateSchema } from 'app/providers/StoreProvider'

export const getAllProgTask = (state: StateSchema) => state.progTasksAdmin.data
