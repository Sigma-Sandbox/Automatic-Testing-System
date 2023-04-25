import {StateSchema} from 'app/providers/StoreProvider'

// Test or task code
export interface TestTaskCode {
  id: string
  description: string
  name: string
}

export type TestItemType = {id: number | string; description: string; rightAns: string[]; wrongAns: string[]}
export interface TestTaskTest {
  id: string
  taskCount: number
  testItem: TestItemType[]
  timeLimits?: string | number
  name: string
}
//

export type TestTaskSetsData = (TestTaskTest | TestTaskCode)[]
export interface TestTaskSets {
  id: string
  name: string
  timeLimits: string | number
  description?: string
  data?: TestTaskSetsData
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
