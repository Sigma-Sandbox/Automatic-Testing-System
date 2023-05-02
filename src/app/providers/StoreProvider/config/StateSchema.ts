import {TaskSetPackSchema} from 'entities/TestTask'
import {UserSchema} from 'entities/User'
import {LoginSchema} from 'features/auth/by-pass'
import {TestUserSchema} from 'widgets/Test'

export interface StateSchema {
  user: UserSchema
  loginForm: LoginSchema
  testTask: TaskSetPackSchema
  testUser: TestUserSchema
}
