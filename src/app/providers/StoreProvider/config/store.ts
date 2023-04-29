import {configureStore, ReducersMapObject} from '@reduxjs/toolkit'
// import { CounterReducer } from "entities/Counter";
import {userReducer} from 'entities/User'
import {StateSchema} from './StateSchema'
import {loginReducer} from 'features/auth/by-pass'
import {testTaskReducer} from 'entities/TestTask'
import {testUserReducer} from 'widgets/Test'

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    loginForm: loginReducer,
    testTask: testTaskReducer,
    testUser: testUserReducer,
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
