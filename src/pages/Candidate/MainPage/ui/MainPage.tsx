import React, {useCallback, useEffect} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './MainPage.module.scss'
import {fetchTestTask} from 'entities/Candidate/TestTask'
import {useDispatch, useSelector} from 'react-redux'
import {getUserAuthData, userActions} from 'entities/Candidate/User'
import {AppDispatch} from 'app/providers/StoreProvider/config/store'
import {TestTaskPack} from 'widgets/Candidate/TestTaskPack'
import {useNavigate} from 'react-router-dom'
import {RoutePathCandidate} from 'shared/config/routeConfig/routeConfig'

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
      navigate(RoutePathCandidate.login)
    }
  }, [])

  const goTestPage = useCallback((idTest: string) => {
    navigate(RoutePathCandidate.test, {state: {idTest: idTest}})
  }, [])

  return (
    <div className={classNames(cls.main, {}, [className, 'container'])}>
      <TestTaskPack startTest={goTestPage}></TestTaskPack>
    </div>
  )
}
