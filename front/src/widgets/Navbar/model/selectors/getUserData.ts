import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData, getUserNavbar } from 'entities/User'
import { UserNavbar } from '../../type/navbar'

export const getUserData = createSelector(getUserAuthData, (userData) => {
  if (userData) {
    const userDataObj: UserNavbar = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      position: userData.position,
    }
    return userDataObj
  }
  return null
})
