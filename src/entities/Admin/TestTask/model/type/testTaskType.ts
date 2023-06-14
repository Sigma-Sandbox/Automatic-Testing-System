import { TestQuestion, TestTask } from 'entities/Candidate/TestTask'

export interface TestTaskSchema {
  isLoading: boolean
  error?: string
  data: TestTask[]
  questions: TestQuestion[]
}
