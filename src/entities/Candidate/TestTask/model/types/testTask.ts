import {ProgrammingLanguage} from 'core/enums'

export interface TaskSetPackSchema {
  isLoading: boolean
  error?: string
  data?: TaskSetPack
}

export interface TaskSetPack {
  id: number
  name?: string
  description?: string
  timeLimits?: number
  data: TaskSet[]
  numOfTry: number
}

export interface TaskSet {
  id?: number
  name: string
  description: string
  testTasks: TestTask[]
  progTasks: ProgTask[]
  creator: string
  timeOfCreation: number
  timeLimits: number
  language: ProgrammingLanguage[]
}

export interface Task {
  id: number
  name: string
  description: string
}

export type ProgAndTestTask = (TestTask | ProgTask)[]

export interface Condition {
  language: ProgrammingLanguage
  maxTime: number
  maxMemory: number
  codeExample: string
  autoTests: string
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
  id: number
  description: string
  points: number
  wrongAnswers: string[]
  correctAnswers: string[]
}

// export type Selector<S> = (state: StateSchema) => S

// export interface TaskSet {
//   id?: number
//   name: string
//   description: string
//   testTasks: TestTask[]
//   progTasks: ProgTask[]
//   creator: string
//   timeOfCreation: number
//   language: ProgrammingLanguage[]
// }

// export interface Task {
//   id?: number
//   name: string
//   description: string
// }

// export interface Condition {
//   language: ProgrammingLanguage
//   maxTime: number
//   maxMemory: number
// }

// export interface ProgTask extends Task {
//   autoTests: string[]
//   complexityAssessment: number
//   conditions: Condition[]
// }

// export interface TestTask extends Task {
//   questions: TestQuestion[]
//   execTime: number
// }

// export interface TestQuestion {
//   id?: number
//   description: string
//   points: number
//   wrongAnswers: string[]
//   correctAnswers: string[]
// }
