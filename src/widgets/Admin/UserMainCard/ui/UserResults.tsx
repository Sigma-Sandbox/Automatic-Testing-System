import React, { useCallback, useEffect, useState } from 'react'
import { UserResultTaskSet } from './UserResultTaskSet/UserResultTaskSet'
import { UserSolution } from 'entities/Admin/Users'
import { ResultVacancyTest } from 'entities/User'
import { useSelector } from 'react-redux'
import { Vacancy, getVacancies } from 'entities/Admin/Vacancies'

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
    if (allVacancy.length > 0) {
      fetchUserDecision(allVacancy)
    }
  }, [allVacancy])

  const fetchUserDecision = useCallback(
    (allVacancy: Vacancy[]) => {
      const taskSets: { [key: string]: UserSolution[] } = {}
      resultVacancies.forEach((vac) => {
        const vacancyWithTaskSets = allVacancy.find((el) => el.id === vac.vacancyId)

        if (vacancyWithTaskSets) {
          vacancyWithTaskSets.taskSets.forEach((el) => (taskSets[el.id!] = []))
        }
      })

      for (const vacancy of resultVacancies) {
        for (const userDesicion of vacancy.userSolutions) {
          if (taskSets[userDesicion.taskSetId]) {
            taskSets[userDesicion.taskSetId].push(userDesicion)
          } else {
            taskSets[userDesicion.taskSetId] = [userDesicion]
          }
        }
      }

      const newResultTaskSet: JSX.Element[] = []

      for (const [taskSetId, userDesicion] of Object.entries(taskSets)) {
        const nymOfTryDesicion: { [key: number]: UserSolution[] } = {}
        userDesicion.forEach((desicion) => {
          if (nymOfTryDesicion[desicion.numOfTry]) {
            nymOfTryDesicion[desicion.numOfTry].push(desicion)
          } else {
            nymOfTryDesicion[desicion.numOfTry] = [desicion]
          }
        })

        for (const [nymOfTry, decisions] of Object.entries(nymOfTryDesicion)) {
          newResultTaskSet.push(
            <UserResultTaskSet
              nymOfTry={+nymOfTry}
              key={taskSetId + ' ' + nymOfTry}
              taskSetId={+taskSetId}
              decisions={decisions}
              userId={userId}
            />
          )
        }
        if (userDesicion.length === 0) {
          newResultTaskSet.push(
            <UserResultTaskSet
              nymOfTry={1}
              key={taskSetId + ' ' + 0}
              taskSetId={+taskSetId}
              decisions={[]}
              userId={userId}
            />
          )
        }
      }

      setResultTaskSet(newResultTaskSet)
    },
    [userId, resultVacancies]
  )

  return <>{resultTaskSet}</>
}
