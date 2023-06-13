import React, {useCallback} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './LoginPage.module.scss'
import {LoginModal} from 'features/auth/by-pass'
import {useNavigate} from 'react-router-dom'
import {RoutePath} from 'shared/config/routeConfig/routeConfig'

interface LoginProps {
  className?: string
}

export const LoginPage: React.FC<LoginProps> = (props) => {
  const {className} = props
  let navigate = useNavigate()

  const onSuccess = useCallback(async () => {
    navigate(RoutePath.main)
  }, [])

  return (
    <div className={classNames(cls.login, {}, [])}>
      <LoginModal onSuccess={onSuccess} />
    </div>
  )
}
