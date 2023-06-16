import { StateSchema } from 'app/providers/StoreProvider'
import { ResultVacancyTest } from '../../types/user'

export const getUserCurTaskSetData =
  (testId: number) =>
  (state: StateSchema): ResultVacancyTest | undefined => {
    return state.user.authData?.vacancies.find((el) => el.vacancyId === testId)
  }
