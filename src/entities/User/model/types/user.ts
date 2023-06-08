import { UserRole } from 'core/enums'
import { ResultVacancyTest } from 'core/entities'

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

export interface UserSchema {
  authData?: User
}
