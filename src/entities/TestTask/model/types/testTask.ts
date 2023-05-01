import { Condition } from 'core/entities'

// Test or task code
export interface ProgTask {
  id: number
  description: string
  name: string
  examples?: string
  condition: Condition[]
  complexityAssessment?: number
}

export interface TestQuestion {
  id: number
  description: string
  rightAns: string[]
  wrongAns: string[]
}

export interface TestTask {
  id: number
  testItem: TestQuestion[]
  timeLimits?: number
  name: string
}

export type Task = (TestTask | ProgTask)[]
export interface TaskSet {
  id: number
  name: string
  timeLimits: number
  description?: string
  data?: Task
}

export interface TaskSetPack {
  id: number
  name: string
  description?: string
  timeLimits: number
  data: TaskSet[]
}
export interface TaskSetPackSchema {
  isLoading: boolean
  error?: string
  data?: TaskSetPack
}

// export type Selector<S> = (state: StateSchema) => S
