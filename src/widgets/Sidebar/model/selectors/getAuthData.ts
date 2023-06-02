import {createSelector} from '@reduxjs/toolkit'
import {getUserAuthData} from 'entities/User'
import {User, UserSchema} from 'entities/User'

// For future
export const getUserData = createSelector(getUserAuthData, (userData: User | undefined) => {
  if (userData) {
  }
  return null
})
