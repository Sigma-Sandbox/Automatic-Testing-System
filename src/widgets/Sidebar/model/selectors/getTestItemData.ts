import {createSelector} from '@reduxjs/toolkit'
import {StateSchema} from 'app/providers/StoreProvider'
import {TestUser, TestUserSchema} from 'widgets/Test'

export const getTestItemData = createSelector(
  (state: StateSchema) => state.testUser,
  (testUser: TestUserSchema) => {
    return testUser.data || null
  }
)
