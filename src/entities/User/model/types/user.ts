import { UserRole } from 'core/enums'
import { UserSolution } from 'entities/Admin/Users'
import { Vacancy } from 'entities/Admin/Vacancies'
import { TaskSet } from 'entities/Candidate/TestTask'

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
  numOfTry: number
}

export interface UserSchema {
  authData?: User
}
