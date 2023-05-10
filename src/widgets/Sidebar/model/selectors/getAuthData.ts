import {createSelector} from '@reduxjs/toolkit'
import {getUserAuthData} from 'entities/Candidate/User'
import {User, UserSchema} from 'entities/Candidate/User'

// For future
export const getUserData = createSelector(getUserAuthData, (userData: User | undefined) => {
  if (userData) {
  }
  return null
})
