import { UserRole, ProgrammingLanguage, TaskResult, TaskType, Vacancy } from './enums'

export type WithNumOfTry<T> = T & { numOfTry: number }
export type WithVacancyId<T> = T & { vacancyId: number }

export interface ResultVacancyTest {
  vacancyId: number
  vacancyName: Vacancy
  userSolutions: UserSolution[]
  numOfTry: number
}

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
  vacancies: ResultVacancyTest[]
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

export interface VacancyTest {
  id?: number
  name: string
  taskSets: TaskSet[]
}

export interface TaskSet {
  id?: number
  name: string
  description: string
  testTasks: TestTask[]
  progTasks: ProgTask[]
  creator: string
  timeLimits: number,
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
  codeExample: string
  autoTests: string
}

export interface ProgTask extends Task {
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