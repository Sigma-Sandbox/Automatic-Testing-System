import { createSelector } from '@reduxjs/toolkit'
import { selectTestTask } from './testTask'
import { ResultVacancyTaskSets, TaskSet } from '../types/testTask'
import { WithNumOfTry, WithVacancyId } from 'core/entities'

type ReturnType = WithVacancyId<WithNumOfTry<TaskSet>> | null
export const getCurrentTask = (testId: string, vacancyId: number) =>
  createSelector(selectTestTask, (testTask: { [key: number]: ResultVacancyTaskSets } | undefined): ReturnType => {
    const task = testTask?.[vacancyId].taskSets.find((el) => el.id === +testId)
    if (task && testTask) {
      return { ...task, numOfTry: testTask[vacancyId].numOfTry, vacancyId }
    } else {
      return null
    }
  })
