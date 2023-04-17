import React, {useCallback, useEffect} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './MainPage.module.scss'
import {fetchTestTask} from 'entities/TestTask'
import {useDispatch, useSelector} from 'react-redux'
import {getUserAuthData, userActions} from 'entities/User'
import {AppDispatch} from 'app/providers/StoreProvider/config/store'
import {TestTaskPack} from 'widgets/TestTaskPack'
import {useNavigate} from 'react-router-dom'
import {RoutePath} from 'shared/config/routeConfig/routeConfig'

interface MainProps {
  className?: string
}

export const MainPage: React.FC<MainProps> = (props) => {
  const {className = ''} = props
  const dispatch = useDispatch<AppDispatch>()
  const authData = useSelector(getUserAuthData)
  const navigate = useNavigate()

  useEffect(() => {
    if (!authData) {
      navigate(RoutePath.login)
    }
  }, [])

  const goTestPage = useCallback((idTest: string) => {
    navigate(RoutePath.test, {state: {idTest: idTest}})
  }, [])

  return (
    <div className={classNames(cls.main, {}, [className, 'container'])}>
      <TestTaskPack startTest={goTestPage}></TestTaskPack>
    </div>
  )
}
