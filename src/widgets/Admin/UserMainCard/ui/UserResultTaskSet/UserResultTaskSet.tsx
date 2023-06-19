import React, { useCallback, useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './UserResultTaskSet.module.scss'
import { TaskSet } from 'entities/Candidate/TestTask'
import { UserSolution, getTotalScoreTaskSet, usersDataActions } from 'entities/Admin/Users'
import { getTestTaskPath, getUserDecisionPath } from 'shared/const/queryPath'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Vacancy } from 'entities/Admin/Vacancies'
import { fetchTaskSetsData, getTaskSetsById } from 'entities/Admin/TaskSets'
import { AppDispatch } from 'app/providers/StoreProvider/config/store'
import { StateSchema } from 'app/providers/StoreProvider'

interface UserResultTaskSetProps {
  className?: string
  taskSetId: number
  userId: number
  decisions: UserSolution[]
  nymOfTry: number
}
interface IResultTaskSets {
  taskSetName: string | null
  taskSetId: number | null
  totalScore: number | null
  userScore: number | null
}
export const UserResultTaskSet: React.FC<UserResultTaskSetProps> = (props) => {
  const { className = '', taskSetId, userId, decisions, nymOfTry } = props
  const [loadResults, setLoadResult] = useState<boolean>(true)
  const [errorResults, setErrorResult] = useState<string | null>(null)
  const taskSet: TaskSet | undefined = useSelector(getTaskSetsById(taskSetId))
  const totalScoreTaskSet = useSelector(getTotalScoreTaskSet(taskSetId))
  const [totalScore, setTotalScore] = useState<number | null>(null)
  const [userScoreTaskSet, setUserScoreTaskSet] = useState<number | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  const countTotalScoreTaskSet = (taskSet: TaskSet) => {
    let totalScoreTaskSetNew = taskSet.progTasks.reduce((curSum, progTask) => progTask.complexityAssessment + curSum, 0)
    totalScoreTaskSetNew += taskSet.testTasks.reduce(
      (curSum, testTasks) => (testTasks.questions?.length || 0) + curSum,
      0
    )
    if (taskSetId) {
      dispatch(usersDataActions.setScoreTaskSet({ taskSetId: taskSetId, totalScore: totalScoreTaskSetNew }))
    } else {
      console.log('task set ', taskSet.name, ' not id')
    }
    return totalScoreTaskSetNew
  }
  useEffect(() => {
    if (taskSet) {
      countInfoResultUser()
      if (totalScoreTaskSet) {
        setTotalScore(totalScoreTaskSet)
      } else {
        countTotalScoreTaskSet(taskSet)
      }
      setLoadResult(false)
    } else {
    }
  }, [taskSet])

  const countInfoResultUser = useCallback(async () => {
    const userScore = decisions.reduce((curSum, solution) => solution.result + curSum, 0) || 0
    setUserScoreTaskSet(userScore)
    dispatch(usersDataActions.setUserSolution({ userId, taskSetId: taskSetId, solutionTaskset: decisions }))
    setLoadResult(false)
  }, [taskSet, userId])

  if (loadResults) {
    return <div className={classNames(cls.userResultTaskSet, {}, [className, cls.gradient])}></div>
  }

  const show = () => {
    console.log(taskSet, decisions)
  }
  return (
    <div
      onClick={show}
      className={classNames(cls.userResultTaskSet, { [cls.gray]: decisions.length === 0 }, [className])}
    >
      <span className={cls.taskSetName}>
        {taskSet?.name}
        {nymOfTry > 1 ? ' (#' + nymOfTry + ')' : ''}
      </span>

      <span>-</span>
      <span className={cls.taskSetScore}>
        {decisions.length > 0 ? userScoreTaskSet : '^'}/{totalScoreTaskSet || totalScore}
      </span>
    </div>
  )
}
