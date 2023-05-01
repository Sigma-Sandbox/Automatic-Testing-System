import { ConfigurationService } from './core/configurationService'
import { StorageService } from './core/storageService'
import { connectPostgreSQL } from './core/dbConnection'
import { ProgTask, TaskSet, TestQuestion, TestTask, User, UserSolution } from './core/entities'
import express from 'express'
import bodyParser from 'body-parser'
import {
  GetProgTaskConditions,
  GetTaskSetConditions,
  GetTestQuestionConditions,
  GetTestTaskConditions,
  GetUserConditions,
  GetUserSolutionConditions
} from './core/interfaces'

const port = process.env.PORT || 3001
const serverApp = express()
serverApp.use(bodyParser.json())

const configurationService = new ConfigurationService()
const storageService = new StorageService()
configurationService.init().then(() => {
  connectPostgreSQL(configurationService).then(pool => storageService.setPool(pool))
})

serverApp.post('/api/add', async (req, res) => {
  if ('accessRights' in req.body) {
    await storageService.addUser(req.body as User)
  } else if ('result' in req.body) {
    await storageService.addUserSolution(req.body as UserSolution)
  } else if ('testTasks' in req.body) {
    await storageService.addTaskSet(req.body as TaskSet)
  } else if ('conditions' in req.body) {
    await storageService.addProgTask(req.body as ProgTask)
  } else if ('questions' in req.body) {
    await storageService.addTestTask(req.body as TestTask)
  } else if ('wrongAnswers' in req.body) {
    await storageService.addTestQuestion(req.body as TestQuestion)
  }
})

serverApp.post('/api/get/user', async (req, res) => {
  storageService.getUser(req.body as GetUserConditions).then(dbRows => {
    res.send(JSON.stringify(dbRows))
  })
})

serverApp.post('/api/get/user_solution', async (req, res) => {
  storageService.getUserSolution(req.body as GetUserSolutionConditions).then(dbRows => {
    res.send(JSON.stringify(dbRows))
  })
})

serverApp.post('/api/get/task_set', async (req, res) => {
  storageService.getTaskSet(req.body as GetTaskSetConditions).then(dbRows => {
    res.send(JSON.stringify(dbRows))
  })
})

serverApp.post('/api/get/prog_task', async (req, res) => {
  storageService.getProgTask(req.body as GetProgTaskConditions).then(dbRows => {
    res.send(JSON.stringify(dbRows))
  })
})

serverApp.post('/api/get/test_task', async (req, res) => {
  storageService.getTestTask(req.body as GetTestTaskConditions).then(dbRows => {
    res.send(JSON.stringify(dbRows))
  })
})

serverApp.post('/api/get/test_question', async (req, res) => {
  storageService.getTestQuestion(req.body as GetTestQuestionConditions).then(dbRows => {
    res.send(JSON.stringify(dbRows))
  })
})

serverApp.post('/api/update', async (req, res) => {
  if ('accessRights' in req.body) {
    await storageService.updateUser(req.body as User)
  } else if ('result' in req.body) {
    await storageService.updateUserSolution(req.body as UserSolution)
  } else if ('testTasks' in req.body) {
    await storageService.updateTaskSet(req.body as TaskSet)
  } else if ('conditions' in req.body) {
    await storageService.updateProgTask(req.body as ProgTask)
  } else if ('questions' in req.body) {
    await storageService.updateTestTask(req.body as TestTask)
  } else if ('wrongAnswers' in req.body) {
    await storageService.updateTestQuestion(req.body as TestQuestion)
  }
})

serverApp.post('/api/delete/user', async (req, res) => {
  await storageService.deleteUser(req.body.id)
})

serverApp.post('/api/delete/user_solution', async (req, res) => {
  await storageService.deleteUserSolution(req.body.id)
})

serverApp.post('/api/delete/task_set', async (req, res) => {
  await storageService.deleteTaskSet(req.body.id)
})

serverApp.post('/api/delete/prog_task', async (req, res) => {
  await storageService.deleteProgTask(req.body.id)
})

serverApp.post('/api/delete/test_task', async (req, res) => {
  await storageService.deleteTestTask(req.body.id)
})

serverApp.post('/api/delete/test_question', async (req, res) => {
  await storageService.deleteTestQuestion(req.body.id)
})

serverApp.listen(port, () => console.log(`Express server listening on port ${port}`))