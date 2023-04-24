import {createSelector} from '@reduxjs/toolkit'
import {StateSchema} from 'app/providers/StoreProvider'
import {TestUserSchema} from '../type/test'

export const getTestItemData = createSelector(
  (state: StateSchema) => state.testUser,
  (testUser: TestUserSchema) => {
    console.log(testUser)
    return testUser.data || null
  }
)
