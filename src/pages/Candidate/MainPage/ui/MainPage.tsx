import React, { useCallback, useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './MainPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ResultVacancyTest, User, getUserAuthData, userActions } from 'entities/User'
import { AppDispatch } from 'app/providers/StoreProvider/config/store'
import { TestTaskPack } from 'widgets/Candidate/TestTaskPack'
import { useNavigate, useParams } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { loginByLink } from '../model/services/loginByLink/loginByLink'
import { ResultVacancyTaskSets, TaskSet, fetchTestTask, testTaskActions } from 'entities/Candidate/TestTask'
import { fetchVacancyTaskSet } from '../model/services/fetchVacancyTaskSet/fetchVacancyTaskSet'
import { Vacancy } from 'entities/Admin/Vacancies'

interface MainProps {
  className?: string
}

export const MainPage: React.FC<MainProps> = (props) => {
  const { className = '' } = props
  const dispatch = useDispatch<AppDispatch>()
  const authData = useSelector(getUserAuthData)
  const { userId } = useParams()

  const [userInfo, setUserInfo] = useState<User>()
  const [taskSetsWithId, setTaskSetsWithId] = useState<{ [key: string]: TaskSet[] }>({})

  const navigate = useNavigate()

  useEffect(() => {
    if (userId) {
      sendQueryApplicant(userId)
    }

    // if () {
    // navigate(RoutePath.login)
    // }
  }, [])

  useEffect(() => {
    if (Object.values(taskSetsWithId).length > 0 && userInfo) {
      const newVacancyObj: { [key: string]: ResultVacancyTaskSets } = {}

      userInfo.vacancies.forEach((vacan) => {
        newVacancyObj[vacan.vacancyId] = {
          vacancyId: vacan.vacancyId,
          vacancyName: vacan.vacancyName,
          userSolutions: vacan.userSolutions,
          numOfTry: vacan.numOfTry,
          taskSets: taskSetsWithId[vacan.vacancyId],
        }
      })
      dispatch(testTaskActions.setTestTaskData(newVacancyObj))
    }
  }, [userInfo, taskSetsWithId])

  useEffect(() => {
    if (userInfo) {
      const taskSet: { [key: string]: TaskSet[] } = {}
      Promise.all(
        userInfo.vacancies.map(async (vacan) => {
          const taskSets = await fetchVacancyTaskSet({ id: vacan.vacancyId })
          if (taskSets) taskSet[vacan.vacancyId] = taskSets
        })
      )
        .catch((err) => {
          // err.message // Oops!
        })
        .then(() => setTaskSetsWithId(taskSet))
    }
  }, [userInfo])

  const sendQueryApplicant = async (userId: string) => {
    const answer = await loginByLink({ link: userId })

    if (answer && answer[0]) {
      dispatch(userActions.setAuthData({ ...answer[0], actualLink: userId }))

      setUserInfo(answer[0])
    } else {
    }
  }

  const goTestPage = useCallback((testId: string, vacancyId: number) => {
    navigate(RoutePath.test, { state: { testId, vacancyId } })
  }, [])

  const goOut = () => {}

  // if (!authData) {
  //   return <div className={classNames(cls.main, {}, [className, 'container'])}>Загружаемся</div>
  // }

  return (
    <div className={classNames(cls.main, {}, [className, 'container'])}>
      <TestTaskPack startTest={goTestPage}></TestTaskPack>
    </div>
  )
}
