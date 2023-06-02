import {ProgTask, TaskSet} from 'entities/Candidate/TestTask'

export interface ProgTaskSchema {
  isLoading: boolean
  error?: string
  data: ProgTask[]
}
