import {TaskResult, TaskType} from 'core/enums'
import {TaskSet} from 'entities/Candidate/TestTask'
import {User} from 'entities/User'

export interface TaskSetsSchema {
  isLoading: boolean
  error?: string
  data: TaskSet[]
}
