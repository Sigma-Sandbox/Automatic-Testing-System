import { UserRole } from 'core/enums'
import { UserSolution } from 'entities/Admin/Users'

export interface User {
  id: number
  surname: string
  name: string
  patronymic?: string
  accessRights: UserRole
  email: string
  password?: string
  actualLink: string
  startLinkTimestamp: number | string
  endLinkTimestamp: number | string
  vacancies: ResultVacancyTest[]
}

export interface ResultVacancyTest {
  vacancyId: number
  vacancyName: string
  userSolutions: UserSolution[]
}

export interface UserSchema {
  authData?: User
}
