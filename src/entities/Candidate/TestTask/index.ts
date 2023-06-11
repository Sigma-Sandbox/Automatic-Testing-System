import { getCurrentTask } from './model/selectors/currentTestTask'
import { selectTestTask } from './model/selectors/testTask'
import { fetchTestTask } from './model/services/fetchTestTask/getTestTask'
import { testTaskReducer, testTaskActions } from './model/slice/testTaskSlice'
import {
  TaskSetPackSchema,
  TaskSetPack,
  TaskSet,
  ProgTask,
  TestTask,
  Task,
  TestQuestion,
  ProgAndTestTask,
  Condition,
} from './model/types/testTask'

export type {
  TaskSetPackSchema,
  TaskSetPack,
  TaskSet,
  ProgTask,
  TestTask,
  Task,
  TestQuestion,
  ProgAndTestTask,
  Condition,
}

export { selectTestTask, testTaskReducer, fetchTestTask, getCurrentTask, testTaskActions }
