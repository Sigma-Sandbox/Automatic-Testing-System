import {UserRole} from 'core/enums'
import {TaskSet, TaskSetPack} from 'entities/Candidate/TestTask'

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
  vacancies: {[vacancy: string]: {[numOfTry: number]: TaskSet[]}}
}

export interface UserSchema {
  authData?: User
}
