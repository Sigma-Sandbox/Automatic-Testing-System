export interface TestTaskItem {
  description: string
  taskCount: number
  timeLimits: string | number
  name: string
}

export interface TestTask {
  id: string
  name: string
  timeLimits: string | number
  data: TestTaskItem[]
}

export interface TestTaskSchema {
  isLoading: boolean
  error?: string
  data?: TestTask
}
