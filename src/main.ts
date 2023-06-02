import { ConfigurationService } from './core/configurationService'
import { StorageService } from './core/storageService'
import { connectPostgreSQL } from './core/dbConnection'
import { ProgTask, TaskSet, TestQuestion, TestTask, User, UserSolution, VacancyTest } from './core/entities'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {
  GetProgTaskConditions,
  GetTaskSetConditions,
  GetTestQuestionConditions,
  GetTestTaskConditions,
  GetUserConditions,
  GetUserSolutionConditions, GetVacancyTestConditions
} from './core/interfaces'

const port = process.env.PORT || 3001
const serverApp = express()
serverApp.use(cors())
serverApp.use(bodyParser.json())

const configurationService = new ConfigurationService()
const storageService = new StorageService()
configurationService.init().then(() => {
  connectPostgreSQL(configurationService).then(pool => storageService.setPool(pool))
})

serverApp.post('/api/add', (req, res) => {
  if ('accessRights' in req.body) {
    storageService.addUser(req.body as User).then(() => res.send())
  } else if ('result' in req.body) {
    storageService.addUserSolution(req.body as UserSolution).then(() => res.send())
  } else if ('taskSets' in req.body) {
    storageService.addVacancyTest(req.body as VacancyTest).then(() => res.send())
  } else if ('testTasks' in req.body) {
    storageService.addTaskSet(req.body as TaskSet).then(() => res.send())
  } else if ('conditions' in req.body) {
    storageService.addProgTask(req.body as ProgTask).then(() => res.send())
  } else if ('questions' in req.body) {
    storageService.addTestTask(req.body as TestTask).then(() => res.send())
  } else if ('wrongAnswers' in req.body) {
    storageService.addTestQuestion(req.body as TestQuestion).then(() => res.send())
  }
})

serverApp.post('/api/get/user', async (req, res) => {
  const dbRows = await storageService.getUser(req.body as GetUserConditions)
  res.send(dbRows)
})

serverApp.post('/api/get/user_solution', async (req, res) => {
  const dbRows = await storageService.getUserSolution(req.body as GetUserSolutionConditions)
  res.send(dbRows)
})

serverApp.post('/api/get/vacancy_test', async (req, res) => {
  const dbRows = await storageService.getVacancyTest(req.body as GetVacancyTestConditions)
  res.send(dbRows)
})

serverApp.post('/api/get/task_set', async (req, res) => {
  const dbRows = await storageService.getTaskSet(req.body as GetTaskSetConditions)
  res.send(dbRows)
})

serverApp.post('/api/get/prog_task', async (req, res) => {
  const dbRows = await storageService.getProgTask(req.body as GetProgTaskConditions)
  res.send(dbRows)
})

serverApp.post('/api/get/test_task', async (req, res) => {
  const dbRows = await storageService.getTestTask(req.body as GetTestTaskConditions)
  res.send(dbRows)
})

serverApp.post('/api/get/test_question', async (req, res) => {
  const dbRows = await storageService.getTestQuestion(req.body as GetTestQuestionConditions)
  res.send(dbRows)
})

serverApp.post('/api/update', (req, res) => {
  if ('accessRights' in req.body) {
    storageService.updateUser(req.body as User).then(() => res.send())
  } else if ('result' in req.body) {
    storageService.updateUserSolution(req.body as UserSolution).then(() => res.send())
  } else if ('taskSets' in req.body) {
    storageService.updateVacancyTest(req.body as VacancyTest).then(() => res.send())
  } else if ('testTasks' in req.body) {
    storageService.updateTaskSet(req.body as TaskSet).then(() => res.send())
  } else if ('conditions' in req.body) {
    storageService.updateProgTask(req.body as ProgTask).then(() => res.send())
  } else if ('questions' in req.body) {
    storageService.updateTestTask(req.body as TestTask).then(() => res.send())
  } else if ('wrongAnswers' in req.body) {
    storageService.updateTestQuestion(req.body as TestQuestion).then(() => res.send())
  }
})

serverApp.post('/api/delete/user', (req, res) => {
  storageService.deleteUser(req.body.id).then(() => res.send())
})

serverApp.post('/api/delete/user_solution', (req, res) => {
  storageService.deleteUserSolution(req.body.id).then(() => res.send())
})

serverApp.post('/api/delete/vacancy_test', (req, res) => {
  storageService.deleteVacancyTest(req.body.id).then(() => res.send())
})

serverApp.post('/api/delete/task_set', (req, res) => {
  storageService.deleteTaskSet(req.body.id).then(() => res.send())
})

serverApp.post('/api/delete/prog_task', (req, res) => {
  storageService.deleteProgTask(req.body.id).then(() => res.send())
})

serverApp.post('/api/delete/test_task', (req, res) => {
  storageService.deleteTestTask(req.body.id).then(() => res.send())
})

serverApp.post('/api/delete/test_question', (req, res) => {
  storageService.deleteTestQuestion(req.body.id).then(() => res.send())
})

serverApp.listen(port, () => console.log(`Express server listening on port ${port}`))