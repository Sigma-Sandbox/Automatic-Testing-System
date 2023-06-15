import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginModal.module.scss'
import LogoIcon from 'shared/assets/logo_white.svg'
import { Toggle_ios } from 'shared/ui/Toggle_ios/Toggle_ios'
import { LoginForm } from '../LoginForm/LoginForm'
import { ToastContainer } from 'react-toastify'

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
      <img src={LogoIcon} alt="" className={cls.logo} />
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <LoginForm onSuccess={onSuccess} />
    </div>
  )
}
