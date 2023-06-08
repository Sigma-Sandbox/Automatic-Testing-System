import React, { useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './UserMainCard.module.scss'
import { ResultVacancyTest } from 'core/entities'
import { UserResultTaskSet } from './UserResultTaskSet/UserResultTaskSet'
import { UserSolution } from 'entities/Admin/Users'

interface UserResultsProps {
  className?: string
  resultVacancies: ResultVacancyTest[]
  userId: number
}

export const UserResults: React.FC<UserResultsProps> = (props) => {
  const { className = '', resultVacancies, userId } = props
  const [resultTaskSet, setResultTaskSet] = useState<JSX.Element[]>([])

  const fetchUserDecision = useCallback(() => {
    const taskSetsDecision: { [key: string]: UserSolution[] } = {}

    for (const vacancy of resultVacancies) {
      for (const userDesicion of vacancy.userSolutions) {
        if (taskSetsDecision[userDesicion.taskId]) {
          taskSetsDecision[userDesicion.taskSetId] = [userDesicion]
        } else {
          taskSetsDecision[userDesicion.taskSetId].push(userDesicion)
        }
      }
    }

    const newResultTaskSet: JSX.Element[] = []

    for (const [taskSetId, userDesicion] of Object.entries(taskSetsDecision)) {
      newResultTaskSet.push(
        <UserResultTaskSet key={taskSetId} taskSetId={+taskSetId} decision={userDesicion} userId={userId} />
      )
    }

    setResultTaskSet(newResultTaskSet)
  }, [userId])

  return <>{resultTaskSet}</>
}
