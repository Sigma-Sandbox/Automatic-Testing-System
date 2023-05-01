import {getCurrentTask} from './model/selectors/currentTestTask'
import {selectTestTask} from './model/selectors/testTask'
import {fetchTestTask} from './model/services/fetchTestTask/getTestTask'
import {testTaskReducer} from './model/slice/testTaskSlice'
import {
  TaskSetPackSchema,
  TaskSetPack,
  TaskSet,
  ProgTask,
  TestTask,
  Task,
  TestQuestion,
} from './model/types/testTask'

export type {TaskSetPackSchema, TaskSetPack, TaskSet, ProgTask, TestTask, Task, TestQuestion}

export {selectTestTask, testTaskReducer, fetchTestTask, getCurrentTask}
