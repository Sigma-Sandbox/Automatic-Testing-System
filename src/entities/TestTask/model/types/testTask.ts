import {StateSchema} from 'app/providers/StoreProvider'

// Test or task code
export interface TestTaskItem {
  id: string
  description: string
  taskCount?: number
  timeLimits: string | number | null
  name: string
}

//
export interface TestTaskSets {
  id: string
  name: string
  timeLimits: string | number
  description?: string
  data?: TestTaskItem[]
  taskCount?: number
}

export interface TestTaskPack {
  id: string
  name: string
  description?: string
  timeLimits: string | number
  data: TestTaskSets[]
}
export interface TestTaskSchema {
  isLoading: boolean
  error?: string
  data?: TestTaskPack
}

// export type Selector<S> = (state: StateSchema) => S
