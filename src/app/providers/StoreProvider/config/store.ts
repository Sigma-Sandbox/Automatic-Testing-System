import {configureStore, ReducersMapObject} from '@reduxjs/toolkit'
// import { CounterReducer } from "entities/Counter";
import {userReducer} from 'entities/User'
import {StateSchema} from './StateSchema'
import {loginReducer} from 'features/auth/by-pass'
import {testTaskReducer} from 'entities/Candidate/TestTask'
import {testUserReducer} from 'widgets/Candidate/Test'
import {usersDataReducer} from 'entities/Admin/Users'
import {taskSetsReducer} from 'entities/Admin/TaskSets/model/slice/taskSetsSlice'
import {vacanciesReducer} from 'entities/Admin/Vacancies'
import {testTaskAdminReducer} from 'entities/Admin/TestTask'
import {progTaskAdminReducer} from 'entities/Admin/ProgTask'

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    loginForm: loginReducer,
    testTask: testTaskReducer,
    testUser: testUserReducer,
    allUsersData: usersDataReducer,
    taskSets: taskSetsReducer,
    vacancies: vacanciesReducer,
    testTasksAdmin: testTaskAdminReducer,
    progTasksAdmin: progTaskAdminReducer,
  }
  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: true,
    preloadedState: initialState,
  })
}

export type RootState = ReturnType<typeof createReduxStore>['getState']
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
