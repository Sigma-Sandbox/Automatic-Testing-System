import { TaskSet } from 'entities/Candidate/TestTask'

export interface VacanciesSchema {
  isLoading: boolean
  error?: string
  data: Vacancy[]
}

export interface Vacancy {
  id: number
  name: string
  taskSets: TaskSet[]
}
