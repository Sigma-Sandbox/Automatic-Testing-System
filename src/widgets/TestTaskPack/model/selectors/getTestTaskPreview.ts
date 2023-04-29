import {createSelector} from '@reduxjs/toolkit'
import {TestTaskPack, TestTaskSets, selectTestTask} from 'entities/TestTask'
// import { TestTaskPrevew } from "../type/testTaskPack";

export const getTestTaskPreview = createSelector(selectTestTask, (testTaskPack: TestTaskPack | undefined) => {
  const previewData: TestTaskPack = {
    id: testTaskPack?.id || '0',
    name: testTaskPack?.name || 'test',
    timeLimits: testTaskPack?.timeLimits || '25 февраля 2023',
    data: testTaskPack?.data || [],
  }
  return previewData
})
