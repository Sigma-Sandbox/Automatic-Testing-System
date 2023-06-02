import {createSelector} from '@reduxjs/toolkit'
import {TaskSetPack, selectTestTask} from 'entities/Candidate/TestTask'

export const getTestTaskPreview = createSelector(
  selectTestTask,
  (testTaskPack: TaskSetPack | undefined) => {
    const previewData: TaskSetPack = {
      id: testTaskPack?.id || 1,
      numOfTry: testTaskPack?.numOfTry || 1,
      name: testTaskPack?.name || 'test',
      timeLimits: testTaskPack?.timeLimits || 0,
      data: testTaskPack?.data || [],
    }
    return previewData
  }
)
