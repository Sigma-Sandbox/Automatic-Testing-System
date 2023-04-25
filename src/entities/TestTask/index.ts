import {getCurrentTask} from './model/selectors/currentTestTask'
import {selectTestTask} from './model/selectors/testTask'
import {fetchTestTask} from './model/services/fetchTestTask/getTestTask'
import {testTaskReducer} from './model/slice/testTaskSlice'
import {
  TestTaskSchema,
  TestTaskPack,
  TestTaskSets,
  TestTaskCode,
  TestTaskTest,
  TestTaskSetsData,
  TestItemType,
} from './model/types/testTask'

export type {TestTaskSchema, TestTaskPack, TestTaskSets, TestTaskCode, TestTaskTest, TestTaskSetsData, TestItemType}

export {selectTestTask, testTaskReducer, fetchTestTask, getCurrentTask}
