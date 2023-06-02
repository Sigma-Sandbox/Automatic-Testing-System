import {StateSchema} from 'app/providers/StoreProvider'

export const getVacanciesName = (state: StateSchema) => {
  return state.vacancies.data.map((vacancy) => vacancy.name)
}
