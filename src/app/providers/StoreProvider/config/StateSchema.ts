import { TestTaskSchema } from 'entities/TestTask'
import { UserSchema } from 'entities/User'
import { LoginSchema } from 'features/auth/by-pass'

export interface StateSchema {
  user: UserSchema
  loginForm: LoginSchema
  testTask: TestTaskSchema
}
