import {TaskResult, TaskType} from 'core/enums'
import {User} from 'entities/Candidate/User'

export interface UsersSchema {
  isLoading: boolean
  error?: string
  data?: UsersData
}

export interface UsersData {
  allUsers: User[]
  userSolutions: UserSolution[]
}

export interface UserSolution {
  id?: number
  userId: number
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
