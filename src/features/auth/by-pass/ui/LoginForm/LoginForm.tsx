import React, { useCallback, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { Input } from 'shared/ui/Input/Input'
import lockIconSrc from 'shared/assets/icon/lock.svg'
import userIconSrc from 'shared/assets/icon/user.svg'
import { Button, ColorButton, SizeButton, ThemeButton } from 'shared/ui/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { loginActions } from '../../model/slice/loginSlice'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { AppDispatch } from 'app/providers/StoreProvider/config/store'
import { toast } from 'react-toastify'

interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { className, onSuccess } = props

  const dispatch = useDispatch<AppDispatch>()
  const { username, password, error, isLoading } = useSelector(getLoginState)
  const notifyError = (text: string) => toast.error(text)

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value))
    },
    [dispatch]
  )

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value))
    },
    [dispatch]
  )

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }))
    if (result.payload && result.payload.length === 1 && result.meta.requestStatus === 'fulfilled') {
      onSuccess()
      //
      localStorage.setItem('authData', JSON.stringify([username, password]))
      //
    } else {
      notifyError('Неверный логин или пароль пользователя')
    }
  }, [onSuccess, dispatch, password, username])

  return (
    <div className={classNames(cls.wrap, {}, [])}>
      <div className={cls.loginForm}>
        <Input
          className={cls.input}
          placeholder="Логин"
          icon={userIconSrc}
          value={username}
          onChange={onChangeUsername}
        />
        <Input
          className={cls.input}
          placeholder="Пароль"
          icon={lockIconSrc}
          value={password}
          onChange={onChangePassword}
          type={'password'}
        />
      </div>

      <Button
        theme={ThemeButton.BACKGROUND}
        color={ColorButton.INVERT_BACKGROUND_COLOR}
        size={SizeButton.L}
        className={cls.button}
        onClick={onLoginClick}
      >
        Войти
      </Button>
    </div>
  )
}
