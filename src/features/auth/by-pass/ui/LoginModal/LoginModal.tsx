import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginModal.module.scss'
import LogoIcon from 'shared/assets/logo_white.svg'
import { Toggle_ios } from 'shared/ui/Toggle_ios/Toggle_ios'
import { LoginForm } from '../LoginForm/LoginForm'

interface LoginModalProps {
  className?: string
  onSuccess: () => void
}

export const LoginModal: React.FC<LoginModalProps> = (props) => {
  const { className, onSuccess } = props

  const [loginUser, setLoginUser] = useState(true)

  const changeLoginUser = () => {
    setLoginUser((prev) => !prev)
  }
  return (
    <div className={classNames(cls.loginModal, {}, [])}>
      <img src={LogoIcon} alt='' className={cls.logo} />

      <Toggle_ios
        onChange={changeLoginUser}
        isUser={loginUser}
        className={cls.toggle}
      />
      <LoginForm onSuccess={onSuccess} />
    </div>
  )
}
