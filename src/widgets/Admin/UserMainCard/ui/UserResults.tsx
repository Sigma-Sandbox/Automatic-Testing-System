import React, { useCallback, useEffect, useState } from 'react'
import { UserResultTaskSet } from './UserResultTaskSet/UserResultTaskSet'
import { UserSolution } from 'entities/Admin/Users'
import { ResultVacancyTest } from 'entities/User'
import { useSelector } from 'react-redux'
import { getVacancies } from 'entities/Admin/Vacancies'

interface UserResultsProps {
  className?: string
  resultVacancies: ResultVacancyTest[]
  userId: number
}

export const UserResults: React.FC<UserResultsProps> = (props) => {
  const { className = '', resultVacancies, userId } = props
  const [resultTaskSet, setResultTaskSet] = useState<JSX.Element[]>([])
  const allVacancy = useSelector(getVacancies)

  useEffect(() => {
    fetchUserDecision()
  }, [])

  const fetchUserDecision = useCallback(() => {
    const taskSets: { [key: string]: UserSolution[] } = {}
    resultVacancies.forEach((vac) => {
      const vacancyWithTaskSets = allVacancy.find((el) => el.id === vac.vacancyId)
      if (vacancyWithTaskSets) {
        vacancyWithTaskSets.taskSets.forEach((el) => (taskSets[el.id!] = []))
      }
    })

    for (const vacancy of resultVacancies) {
      for (const userDesicion of vacancy.userSolutions) {
        if (taskSets[userDesicion.taskId]) {
          taskSets[userDesicion.taskSetId].push(userDesicion)
        } else {
          taskSets[userDesicion.taskSetId] = [userDesicion]
        }
      }
    }

    const newResultTaskSet: JSX.Element[] = []

    for (const [taskSetId, userDesicion] of Object.entries(taskSets)) {
      newResultTaskSet.push(
        <UserResultTaskSet key={taskSetId} taskSetId={+taskSetId} decisions={userDesicion} userId={userId} />
      )
    }

    setResultTaskSet(newResultTaskSet)
  }, [userId])

  return <>{resultTaskSet}</>
}
