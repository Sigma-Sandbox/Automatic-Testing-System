import {createSelector} from '@reduxjs/toolkit'
import {getUserAuthData, getUserNavbar} from 'entities/User'
import {UserNavbar} from '../../type/navbar'

export const getUserData = createSelector(getUserAuthData, (userData) => {
  if (userData) {
    const userDataObj: UserNavbar = {
      firstname: userData.name,
      lastname: userData.surname,
      position: Object.keys(userData.vacancies),
    }
    return userDataObj
  }
  return null
})
