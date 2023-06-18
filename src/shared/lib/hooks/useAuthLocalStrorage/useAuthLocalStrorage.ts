import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData, userActions } from 'entities/User'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { AppDispatch } from 'app/providers/StoreProvider/config/store'
import { loginByUsername } from 'features/auth/by-pass'

export const useAuthLocalStrorage = () => {
  const userAuthData = useSelector(getUserAuthData)
  const dispatch = useDispatch<AppDispatch>()
  let navigate = useNavigate()

  const checkAuthData = async () => {
    if (!userAuthData) {
      let data = localStorage.getItem('authData')
      if (data) {
        let [username, pass] = JSON.parse(data)
        const result = await onLogin(username, pass)
        if (result === undefined || result.length === 0) {
          navigate(RoutePath.login)
        }
        return true
      } else {
        navigate(RoutePath.login)
      }
    } else {
      return true
    }
  }

  const onLogin = useCallback(async (username: string, password: string) => {
    const result = await dispatch(loginByUsername({ username, password }))
    return result.payload
  }, [])

  const clearAuthData = () => {
    localStorage.removeItem('authData')
    dispatch(userActions.logout())
  }

  return [checkAuthData, clearAuthData] as const
}
