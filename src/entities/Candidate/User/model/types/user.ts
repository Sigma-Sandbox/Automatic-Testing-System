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
  startLinkTimestamp: number
  endLinkTimestamp: number
  taskSets: TaskSetPack
  position: string
}

export interface UserSchema {
  authData?: User
}
