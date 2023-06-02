import {TaskResult, TaskType} from 'core/enums'
import {ProgTaskSchema} from 'entities/Admin/ProgTask'
import {TaskSetsSchema} from 'entities/Admin/TaskSets'
import {TestTaskSchema} from 'entities/Admin/TestTask'
import {UsersSchema} from 'entities/Admin/Users'
import {VacanciesSchema} from 'entities/Admin/Vacancies'
import {TaskSetPackSchema} from 'entities/Candidate/TestTask'
import {UserSchema} from 'entities/User'
import {LoginSchema} from 'features/auth/by-pass'
import {TestUserSchema} from 'widgets/Candidate/Test'

export interface StateSchema {
  user: UserSchema
  allUsersData: UsersSchema
  loginForm: LoginSchema
  testTask: TaskSetPackSchema
  testUser: TestUserSchema
  taskSets: TaskSetsSchema
  vacancies: VacanciesSchema
  progTasksAdmin: ProgTaskSchema
  testTasksAdmin: TestTaskSchema
}
