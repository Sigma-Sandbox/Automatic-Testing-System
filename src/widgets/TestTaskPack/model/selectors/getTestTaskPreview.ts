import {createSelector} from '@reduxjs/toolkit'
import {TaskSetPack, selectTestTask} from 'entities/TestTask'

export const getTestTaskPreview = createSelector(selectTestTask, (testTaskPack: TaskSetPack | undefined) => {
  const previewData: TaskSetPack = {
    id: testTaskPack?.id || 1,
    name: testTaskPack?.name || 'test',
    timeLimits: testTaskPack?.timeLimits || 0,
    data: testTaskPack?.data || [],
  }
  return previewData
})
