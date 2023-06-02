import {createSelector} from '@reduxjs/toolkit'
import {selectTestTask} from './testTask'
import {TaskSetPack, TaskSet} from '../types/testTask'
import { WithNumOfTry, WithVacancyId } from 'core/entities'

type ReturnType = WithVacancyId<WithNumOfTry<TaskSet>> | null
export const getCurrentTask = (testId: number) =>
  createSelector(selectTestTask, (testTask: TaskSetPack | undefined): ReturnType => {
    const task = testTask?.data.find((elem) => elem.id === testId) || null

    if (task && testTask) {
      return {...task, numOfTry: testTask.numOfTry, vacancyId: testTask.id}
    } else {
      return null
    }
  })
