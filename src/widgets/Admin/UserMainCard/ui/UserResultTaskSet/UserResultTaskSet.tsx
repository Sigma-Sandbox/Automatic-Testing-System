import React, {useCallback, useEffect, useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './UserResultTaskSet.module.scss'
import {TaskSet} from 'entities/Candidate/TestTask'
import {UserSolution, getTotalScoreTaskSet, usersDataActions} from 'entities/Admin/Users'
import {getUserDecisionPath} from 'shared/const/queryPath'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'

interface UserResultTaskSetProps {
  className?: string
  taskSet: TaskSet
  userId: number
}
interface IResultTaskSets {
  taskSetName: string | null
  taskSetId: number | null
  totalScore: number | null
  userScore: number | null
}
export const UserResultTaskSet: React.FC<UserResultTaskSetProps> = (props) => {
  const {className = '', taskSet, userId} = props
  const [loadResults, setLoadResult] = useState<boolean>(false)
  const [errorResults, setErrorResult] = useState<string | null>(null)
  const totalScoreTaskSet = useSelector(getTotalScoreTaskSet(taskSet.id || -23))
  const [totalScore, setTotalScore] = useState<number | null>(null)
  const [userScoreTaskSet, setUserScoreTaskSet] = useState<number | null>(null)
  const dispatch = useDispatch()

  const newQuery = useCallback(async (body: {}) => {
    const options = {
      method: 'POST',
      url: getUserDecisionPath,
      headers: {'Content-Type': 'application/json', token: '', Authorization: 'Basic Og=='},
      data: body,
    }
    try {
      const response = await axios.post(options.url, options.data, {
        headers: options.headers,
      })
      return response.data
    } catch (error) {
      console.log(error)
      setErrorResult(`Ошибка при получении резултатов тестового задания ${taskSet.name}`)
    }
  }, [])

  const countTotalScoreTaskSet = () => {
    let totalScoreTaskSetNew = taskSet.progTasks.reduce(
      // TODO: get data with wrap array
      // @ts-ignore
      (curSum, progTask) => progTask[0].complexityAssessment + curSum,
      0
    )
    totalScoreTaskSetNew += taskSet.testTasks.reduce(
      // TODO: get data with wrap array
      // @ts-ignore
      (curSum, testTasks) => (testTasks[0].questions?.length || 0) + curSum,
      0
    )
    if (taskSet.id) {
      dispatch(
        usersDataActions.setScoreTaskSet({taskSetId: taskSet.id, totalScore: totalScoreTaskSetNew})
      )
    } else {
      console.log('task set ', taskSet.name, 'not id')
    }
    return totalScoreTaskSetNew
  }
  useEffect(() => {
    if (taskSet.id && userId) {
      setLoadResult(true)
      getInfoResultUser()
      if (totalScoreTaskSet) {
        setTotalScore(totalScoreTaskSet)
      } else {
        countTotalScoreTaskSet()
      }
    }
  }, [userId, taskSet])

  const getInfoResultUser = useCallback(async () => {
    if (taskSet.id && userId) {
      const data: UserSolution[] = await newQuery({userId, taskSetId: taskSet.id})
      const userScore = data?.reduce((curSum, solution) => solution.result + curSum, 0) || 0
      setUserScoreTaskSet(userScore)
      if (data) {
        dispatch(
          usersDataActions.setUserSolution({userId, taskSetId: taskSet.id, solutionTaskset: data})
        )
      }
    }
    setLoadResult(false)
  }, [taskSet, userId])

  if (loadResults) {
    return <div className={classNames(cls.userResultTaskSet, {}, [className, cls.gradient])}></div>
  }
  return (
    <div className={classNames(cls.userResultTaskSet, {}, [className])}>
      <span className={cls.taskSetName}>{taskSet.name}</span>-
      <span className={cls.taskSetScore}>
        {userScoreTaskSet}/{totalScoreTaskSet || totalScore}
      </span>
    </div>
  )
}
