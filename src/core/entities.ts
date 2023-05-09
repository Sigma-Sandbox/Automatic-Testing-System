import { UserRole, ProgrammingLanguage, TaskResult, TaskType } from './enums'

export interface User {
  id?: number
  accessRights: UserRole
  surname: string
  name: string
  patronymic?: string
  email: string
  password?: string
  actualLink: string
  startLinkTimestamp: number
  endLinkTimestamp: number
  vacancies: { [vacancy: string] : { [numOfTry: number]: TaskSet[] } }
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

export interface TaskSet {
  id?: number
  name: string
  description: string
  testTasks: TestTask[]
  progTasks: ProgTask[]
  creator: string
  timeOfCreation: number
  language: ProgrammingLanguage[]
}

export interface Task {
  id?: number
  name: string
  description: string
}

export interface Condition {
  language: ProgrammingLanguage
  maxTime: number
  maxMemory: number
}

export interface ProgTask extends Task {
  autoTests: string[]
  complexityAssessment: number
  conditions: Condition[]
}

export interface TestTask extends Task {
  questions: TestQuestion[]
  execTime: number
}

export interface TestQuestion {
  id?: number
  description: string
  points: number
  wrongAnswers: string[]
  correctAnswers: string[]
}