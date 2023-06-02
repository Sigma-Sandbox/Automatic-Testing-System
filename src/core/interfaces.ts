import { ProgTask, Task, TaskSet, TestQuestion, TestTask, User, UserSolution, VacancyTest } from './entities'
import { ProgrammingLanguage, TaskType } from './enums'

export interface GetUserConditions {
  id?: number
  email?: string
  surname?: string
  name?: string
  patronymic?: string
  actualLink?: string
  vacancyId?: number
}

export interface GetUserSolutionConditions {
  id?: number
  userId?: number
  vacancyId?: number
  taskType?: TaskType
  taskId?: number
  taskSetId?: number
  numOfTry?: number
}

export interface GetVacancyTestConditions {
  id?: number
  name?: string
  taskSetId?: number
}

export interface GetTaskSetConditions {
  id?: number
  name?: string
  task?: Task
  creator?: string
  timeOfCreation?: number
  language?: ProgrammingLanguage
}

export interface GetProgTaskConditions {
  id?: number
  name?: string
  complexityAssessment?: number
}

export interface GetTestTaskConditions {
  id?: number
  name?: string
  testQuestion?: TestQuestion
}

export interface GetTestQuestionConditions {
  id?: number
  description?: string
  points?: number
}

export interface IStorageService {
  addUser(user: User): Promise<void>
  addUserSolution(userSolution: UserSolution): Promise<void>
  addVacancyTest(vacancyTest: VacancyTest): Promise<void>
  addTaskSet(taskSet: TaskSet): Promise<void>
  addProgTask(progTask: ProgTask): Promise<void>
  addTestTask(testTask: TestTask): Promise<void>
  addTestQuestion(testQuestion: TestQuestion): Promise<void>

  getUser(conditions?: GetUserConditions): Promise<User[] | undefined>
  getUserSolution(conditions?: GetUserSolutionConditions): Promise<UserSolution[] | undefined>
  getVacancyTest(conditions?: GetVacancyTestConditions): Promise<VacancyTest[] | undefined>
  getTaskSet(conditions?: GetTaskSetConditions): Promise<TaskSet[] | undefined>
  getProgTask(conditions?: GetProgTaskConditions): Promise<ProgTask[] | undefined>
  getTestTask(conditions?: GetTestTaskConditions): Promise<TestTask[] | undefined>
  getTestQuestion(conditions?: GetTestQuestionConditions): Promise<TestQuestion[] | undefined>

  updateUser(user: User): Promise<void>
  updateUserSolution(userSolution: UserSolution): Promise<void>
  updateVacancyTest(vacancyTest: VacancyTest): Promise<void>
  updateTaskSet(taskSet: TaskSet): Promise<void>
  updateProgTask(progTask: ProgTask): Promise<void>
  updateTestTask(testTask: TestTask): Promise<void>
  updateTestQuestion(testQuestion: TestQuestion): Promise<void>

  deleteUser(id: number): Promise<void>
  deleteUserSolution(id: number): Promise<void>
  deleteVacancyTest(id: number): Promise<void>
  deleteTaskSet(id: number): Promise<void>
  deleteProgTask(id: number): Promise<void>
  deleteTestTask(id: number): Promise<void>
  deleteTestQuestion(id: number): Promise<void>
}

export interface DbConfig {
  host: string
  port: number
  superuser: string
  superuserPassword: string
  username: string
  userPassword: string
  database: string
}

export interface IConfigurationService {
  init(): Promise<void>
  getConfiguration(name: string): Promise<any>
  updateConfiguration(module: string, value: any): Promise<void>
}