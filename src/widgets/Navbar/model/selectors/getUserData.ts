import {createSelector} from '@reduxjs/toolkit'
import {getUserAuthData, getUserNavbar} from 'entities/Candidate/User'
import {UserNavbar} from '../../type/navbar'

export const getUserData = createSelector(getUserAuthData, (userData) => {
  if (userData) {
    const userDataObj: UserNavbar = {
      firstname: userData.name,
      lastname: userData.surname,
      position: userData.position,
    }
    return userDataObj
  }
  return null
})
