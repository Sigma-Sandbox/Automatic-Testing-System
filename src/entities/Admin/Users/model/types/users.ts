import {TaskResult, TaskType} from 'core/enums'
import {User} from 'entities/User'
import {statusLoadSolution} from '../consts/usersDataConsts'

export interface UsersSchema {
  isLoading: boolean
  error?: string
  data: UsersData
}

export interface UsersData {
  allUsers: User[]
  allSolution: {[userId: number]: {[taskSetId: number]: UserSolution[]}}
  totalScoreTaskSet: {[taskSetId: number]: number}
}
export interface UserSolution {
  id?: number
  numOfTry: number
  userId: number
  vacancyId: number
  taskType: TaskType
  taskId: number
  taskSetId: number
  execStartTime: number
  execEndTime: number
  progTaskTime?: number
  progTaskMemory?: number
  result: TaskResult
  programCode?: string
  questionAnswers?: string[]
}
