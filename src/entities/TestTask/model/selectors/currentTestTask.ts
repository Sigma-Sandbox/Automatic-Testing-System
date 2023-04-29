import {createSelector} from '@reduxjs/toolkit'
import {selectTestTask} from './testTask'
import {TestTaskPack, TestTaskSets} from '../types/testTask'
import {StateSchema} from 'app/providers/StoreProvider'
import {useDispatch} from 'react-redux'
import {AppDispatch} from 'app/providers/StoreProvider/config/store'

type ReturnType = TestTaskSets | null
export const getCurrentTask = (testId: string) =>
  createSelector(selectTestTask, (testTask: TestTaskPack | undefined): ReturnType => {
    const task = testTask?.data.find((elem) => elem.id === testId) || null

    return task
  })
