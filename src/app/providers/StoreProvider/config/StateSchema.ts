import {TaskResult, TaskType} from 'core/enums'
import {UsersSchema} from 'entities/Admin/Users'
import {TaskSetPackSchema} from 'entities/Candidate/TestTask'
import {UserSchema} from 'entities/Candidate/User'
import {LoginSchema} from 'features/auth/by-pass'
import {TestUserSchema} from 'widgets/Candidate/Test'

export interface StateSchema {
  user: UserSchema
  allUsersData: UsersSchema
  loginForm: LoginSchema
  testTask: TaskSetPackSchema
  testUser: TestUserSchema
}
