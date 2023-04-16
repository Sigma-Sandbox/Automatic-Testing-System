import { createSelector } from '@reduxjs/toolkit'
import { TestTask, selectTestTask } from 'entities/TestTask'
// import { TestTaskPrevew } from "../type/testTaskPack";

export const getTestTaskPreview = createSelector(
  selectTestTask,
  (testTaskData: TestTask | undefined) => {
    console.log(testTaskData)
    if (!testTaskData) {
      console.log('test data not')
      const initPreviewData: TestTask = {
        id: '0',
        name: 'test',
        timeLimits: '25 февраля 2023',
        data: [],
      }
      return initPreviewData
    }
    const previewData: TestTask = {
      id: testTaskData.id,
      name: testTaskData.name,
      timeLimits: testTaskData?.timeLimits,
      data: testTaskData.data,
    }
    return previewData
  }
)
