import { StateSchema } from 'app/providers/StoreProvider'

export const getVacancies = (state: StateSchema) => {
  return state.vacancies.data
}
