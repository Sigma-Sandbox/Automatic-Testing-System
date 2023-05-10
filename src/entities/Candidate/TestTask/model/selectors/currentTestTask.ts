import {createSelector} from '@reduxjs/toolkit'
import {selectTestTask} from './testTask'
import {TaskSetPack, TaskSet} from '../types/testTask'

type ReturnType = TaskSet | null
export const getCurrentTask = (testId: number) =>
  createSelector(selectTestTask, (testTask: TaskSetPack | undefined): ReturnType => {
    const task = testTask?.data.find((elem) => elem.id === testId) || null

    return task
  })
