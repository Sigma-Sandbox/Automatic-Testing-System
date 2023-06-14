import { StateSchema } from 'app/providers/StoreProvider'

export const getQuestions = (state: StateSchema) => state.testTasksAdmin.questions
