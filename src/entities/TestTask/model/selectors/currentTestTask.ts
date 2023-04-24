import {createSelector} from '@reduxjs/toolkit'
import {selectTestTask} from './testTask'
import {TestTaskPack, TestTaskSets} from '../types/testTask'
import {StateSchema} from 'app/providers/StoreProvider'

type ReturnType = TestTaskSets | null
export const getCurrentTask = (testId: string) =>
  createSelector(selectTestTask, (testTask: TestTaskPack | undefined): ReturnType => {
    return testTask?.data.find((elem) => elem.id === testId) || null
  })
