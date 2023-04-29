import {TestTaskSchema} from 'entities/TestTask'
import {UserSchema} from 'entities/User'
import {LoginSchema} from 'features/auth/by-pass'
import {TestUserSchema} from 'widgets/Test'

export interface StateSchema {
  user: UserSchema
  loginForm: LoginSchema
  testTask: TestTaskSchema
  testUser: TestUserSchema
}
