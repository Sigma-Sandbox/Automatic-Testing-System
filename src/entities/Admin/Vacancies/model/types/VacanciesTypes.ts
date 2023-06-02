export interface VacanciesSchema {
  isLoading: boolean
  error?: string
  data: Vacancy[]
}

export interface Vacancy {
  id: number
  name: string
  taskSetIds: number[]
}
