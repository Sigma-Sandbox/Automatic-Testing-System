import {createSelector} from '@reduxjs/toolkit'
import {getUserAuthData, getUserNavbar} from 'entities/Candidate/User'
import {UserNavbar} from '../../type/navbar'
import {StateSchema} from 'app/providers/StoreProvider'
import {TestUserSchema} from 'widgets/Candidate/Test'

export const getCurrentTestData = createSelector(
  (state: StateSchema) => state.testUser,
  (testUser: TestUserSchema) => {
    return testUser.data || null
  }
)
