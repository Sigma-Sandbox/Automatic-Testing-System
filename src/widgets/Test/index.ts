import {testUserActions, testUserReducer} from './model/slice/TestSlice'
import {MainContainer} from './ui/MainContainer/MainContainer'
import {TestUserSchema, TestUser} from './model/type/test'
import {StatusItemTest} from './model/const/testConst'

export type {TestUserSchema, TestUser, StatusItemTest}

export {MainContainer, testUserReducer, testUserActions}
