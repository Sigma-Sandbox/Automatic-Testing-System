import {
  GetProgTaskConditions,
  GetTaskSetConditions, GetTestQuestionConditions,
  GetTestTaskConditions,
  GetUserConditions,
  GetUserSolutionConditions, GetVacancyTestConditions,
  IStorageService,
  UserID
} from './interfaces'
import { Pool } from 'pg'
import { Condition, ProgTask, TaskSet, TestQuestion, TestTask, User, UserSolution, VacancyTest } from './entities'
import { ProgrammingLanguage, Vacancy } from './enums'
import sha256 from 'fast-sha256'
import { randomInt } from 'crypto'

export class StorageService implements IStorageService {
  db: Pool | undefined = undefined

  constructor() {
  }

  async setPool(pool: Pool) {
    this.db = pool
    try {
      await this.createTables()
    } catch (err) {
      console.log('Ошибка во время создания таблиц : ', err)
    }
  }

  async createTables() {
    await this.getDB().query(`
      CREATE TABLE IF NOT EXISTS users
      (
        id SERIAL4 PRIMARY KEY ,
        access_rights SMALLINT,
        surname VARCHAR(64),
        name VARCHAR(64),
        patronymic VARCHAR(64) NULL,
        email VARCHAR(64) UNIQUE,
        password TEXT NULL,
        actual_link TEXT,
        start_link_timestamp TIMESTAMPTZ,
        end_link_timestamp TIMESTAMPTZ,
        vacancies SMALLINT[]
      );

      CREATE TABLE IF NOT EXISTS user_solutions
      (
        id SERIAL4 PRIMARY KEY ,
        num_of_try SMALLINT,
        user_id INT,
        vacancy_id SMALLINT,
        task_type SMALLINT,
        task_id INT,
        task_set_id INT,
        exec_start_time TIMESTAMPTZ,
        exec_end_time TIMESTAMPTZ,
        prog_task_time INT NULL,
        prog_task_memory INT NULL,
        result SMALLINT,
        program_code TEXT NULL,
        question_answers TEXT[] NULL
      );

      CREATE TABLE IF NOT EXISTS vacancy_tests
      (
        id SERIAL4 PRIMARY KEY ,
        name VARCHAR(64) UNIQUE ,
        ids_task_set INT[]
      );

      CREATE TABLE IF NOT EXISTS task_sets
      (
        id SERIAL4 PRIMARY KEY ,
        name VARCHAR(64),
        description TEXT,
        ids_test_task INT[],
        ids_prog_task INT[],
        creator VARCHAR(64),
        time_limits SMALLINT,
        time_of_creation TIMESTAMPTZ,
        language TEXT[] NULL
      );

      CREATE TABLE IF NOT EXISTS prog_tasks
      (
        id SERIAL4 PRIMARY KEY ,
        name VARCHAR(64),
        description TEXT,
        complexity_assessment INT,
        conditions JSONB
      );

      CREATE TABLE IF NOT EXISTS test_tasks
      (
        id SERIAL4 PRIMARY KEY ,
        name VARCHAR(64),
        description TEXT,
        ids_question INT[],
        exec_time INT
      );

      CREATE TABLE IF NOT EXISTS test_questions
      (
        id SERIAL4 PRIMARY KEY ,
        description TEXT,
        points SMALLINT,
        wrong_answers TEXT[],
        correct_answers TEXT[]
      );`
    )
  }

  async addUser(user: User): Promise<void> {
    const vacancies: number[] = user.vacancies.map(vacancy => vacancy.vacancyId)

    try {
      await this.getDB().query(`
        INSERT INTO users
        VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          user.accessRights,
          user.surname,
          user.name,
          user.patronymic,
          user.email,
          user.password,
          user.actualLink,
          user.startLinkTimestamp,
          user.endLinkTimestamp,
          vacancies
        ]
      )
    } catch (err) {
      console.log('addUser', err)
    }
  }

  async addUserSolution(userSolution: UserSolution): Promise<void> {
    try {
      await this.getDB().query(`
        INSERT INTO user_solutions
        VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [
          userSolution.numOfTry,
          userSolution.userId,
          userSolution.vacancyId,
          userSolution.taskType,
          userSolution.taskId,
          userSolution.taskSetId,
          new Date(userSolution.execStartTime),
          new Date(userSolution.execEndTime),
          userSolution.progTaskTime ? Math.round(userSolution.progTaskTime * 1000) : undefined,
          userSolution.progTaskMemory,
          userSolution.result,
          userSolution.programCode,
          userSolution.questionAnswers
        ]
      )
    } catch (err) {
      console.log('addUserSolution', err)
    }
  }

  async addVacancyTest(vacancyTest: VacancyTest): Promise<void> {
    const idsVacancyTest: number[] = vacancyTest.taskSets.map(taskSet => taskSet.id!)

    try {
      await this.getDB().query(`
        INSERT INTO vacancy_tests
        VALUES(DEFAULT, $1, $2)`,
        [
          vacancyTest.name,
          idsVacancyTest
        ]
      )
    } catch (err) {
      console.log('addVacancyTest', err)
    }
  }

  async addTaskSet(taskSet: TaskSet): Promise<void> {
    const idsTestTask: number[] = taskSet.testTasks.map(testTask => testTask.id!)
    const idsProgTask: number[] = taskSet.progTasks.map(progTask => progTask.id!)

    try {
      await this.getDB().query(`
        INSERT INTO task_sets
        VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          taskSet.name,
          taskSet.description,
          idsTestTask,
          idsProgTask,
          taskSet.creator,
          taskSet.timeLimits,
          new Date(taskSet.timeOfCreation),
          taskSet.language
        ]
      )
    } catch (err) {
      console.log('addTaskSet', err)
    }
  }

  async addProgTask(progTask: ProgTask): Promise<void> {
    const conditions: {[k: string]: [number, number, string, string]} = {}
    progTask.conditions.forEach(condition => {
      conditions[condition.language] = [condition.maxTime, condition.maxMemory, condition.codeExample, condition.autoTests]
    })

    try {
      await this.getDB().query(`
        INSERT INTO prog_tasks
        VALUES(DEFAULT, $1, $2, $3, $4)`,
        [
          progTask.name,
          progTask.description,
          progTask.complexityAssessment,
          conditions
        ]
      )
    } catch (err) {
      console.log('addProgTask', err)
    }
  }

  async addTestTask(testTask: TestTask): Promise<void> {
    try {
      await this.getDB().query(`
        INSERT INTO test_tasks
        VALUES(DEFAULT, $1, $2, $3, $4)`,
        [
          testTask.name,
          testTask.description,
          testTask.questions.map(test => test.id),
          testTask.execTime
        ]
      )
    } catch (err) {
      console.log('addTestTask', err)
    }
  }

  async addTestQuestion(testQuestion: TestQuestion): Promise<void> {
    try {
      await this.getDB().query(`
        INSERT INTO test_questions
        VALUES(DEFAULT, $1, $2, $3, $4)`,
        [
          testQuestion.description,
          testQuestion.points,
          testQuestion.wrongAnswers,
          testQuestion.correctAnswers
        ]
      )
    } catch (err) {
      console.log('addTestQuestion', err)
    }
  }

  async getUser(conditions?: GetUserConditions): Promise<User[] | undefined> {
    let resultCondition = ''
    let strConditions = []
    let params = []
    let index = 1

    if (conditions) {
      if (conditions.id) {
        strConditions.push(`id = $${index}`)
        params.push(conditions.id)
        index++
      }
      if (conditions.email) {
        strConditions.push(`email = $${index}`)
        params.push(conditions.email)
        index++
      }
      if (conditions.password) {
        strConditions.push(`password = $${index}`)
        params.push(conditions.password)
        index++
      }
      if (conditions.surname) {
        strConditions.push(`surname = $${index}`)
        params.push(conditions.surname)
        index++
      }
      if (conditions.name) {
        strConditions.push(`name = $${index}`)
        params.push(conditions.name)
        index++
      }
      if (conditions.patronymic) {
        strConditions.push(`patronymic = $${index}`)
        params.push(conditions.patronymic)
        index++
      }
      if (conditions.actualLink) {
        strConditions.push(`actual_link = $${index}`)
        params.push(conditions.actualLink)
      }
      if (conditions.vacancyId) {
        strConditions.push(`$${index} = ANY (vacancies)`)
        params.push(conditions.vacancyId)
      }
    }

    if (strConditions.length > 0) {
      resultCondition = ` WHERE `
    }

    const result = await this.getDB().query(`
      SELECT
        id,
        access_rights,
        surname,
        name,
        patronymic,
        email,
        password,
        actual_link,
        start_link_timestamp,
        end_link_timestamp,
        vacancies
      FROM users` + resultCondition + strConditions.join(' AND '),
      params
    )

    if (result.rows) {
      const userSolutionsPromises: Promise<UserSolution[] | undefined>[] = []
      const vacNamePromises: Promise<VacancyTest[] | undefined>[] = []
      const vacIds: number[] = []
      const userIds: number[] = []
      const temp: User[] = result.rows.map(row => {
        for (const vacId of row.vacancies) {
          const userSolutions = this.getUserSolution({userId: row.id, vacancyId: vacId})
          const vacName = this.getVacancyTest({id: vacId})
          userSolutionsPromises.push(userSolutions)
          vacNamePromises.push(vacName)
          vacIds.push(vacId)
          userIds.push(row.id)
        }

        return {
          id: row.id,
          accessRights: row.access_rights,
          surname: row.surname,
          name: row.name,
          patronymic: row.patronymic,
          email: row.email,
          password: row.password,
          actualLink: row.actual_link,
          startLinkTimestamp: row.start_link_timestamp,
          endLinkTimestamp: row.end_link_timestamp,
          vacancies: []
        }
      })

      const userSolutions = await Promise.all(userSolutionsPromises)
      const vacNames = await Promise.all(vacNamePromises)
      const answer: User[] = []

      for (let i = 0; i < userIds.length; i++) {
        const userId = userIds[i]
        const vacId = vacIds[i]
        const vacName = vacNames[i]
        const userSolution = userSolutions[i]
        const user = answer.find(t => t.id === userId)
        if (user) {
          const index = answer.indexOf(user)
          answer[index].vacancies.push({
            vacancyId: vacId,
            vacancyName: vacName![0].name as Vacancy,
            userSolutions: userSolution!
          })
        } else {
          const user = temp.find(t => t.id === userId)!
          user.vacancies.push({
            vacancyId: vacId,
            vacancyName: vacName![0].name as Vacancy,
            userSolutions: userSolution!
          })
          answer.push(user)
        }
      }
      return answer
    } else {
      console.log('Не найдено ни одного пользователя с такими параметрами!')
      return undefined
    }
  }

  async getUserSolution(conditions?: GetUserSolutionConditions): Promise<UserSolution[] | undefined> {
    let resultCondition = ''
    let strConditions = []
    let params = []
    let index = 1

    if (conditions) {
      if (conditions.id) {
        strConditions.push(`id = $${index}`)
        params.push(conditions.id)
        index++
      }
      if (conditions.numOfTry) {
        strConditions.push(`num_of_try = $${index}`)
        params.push(conditions.numOfTry)
        index++
      }
      if (conditions.userId) {
        strConditions.push(`user_id = $${index}`)
        params.push(conditions.userId)
        index++
      }
      if (conditions.vacancyId) {
        strConditions.push(`vacancy_id = $${index}`)
        params.push(conditions.vacancyId)
        index++
      }
      if (conditions.taskType !== undefined) {
        strConditions.push(`task_type = $${index}`)
        params.push(conditions.taskType)
        index++
      }
      if (conditions.taskId) {
        strConditions.push(`task_id = $${index}`)
        params.push(conditions.taskId)
        index++
      }
      if (conditions.taskSetId) {
        strConditions.push(`task_set_id = $${index}`)
        params.push(conditions.taskSetId)
      }
    }

    if (strConditions.length > 0) {
      resultCondition = ` WHERE `
    }

    const result = await this.getDB().query(`
      SELECT
        id,
        num_of_try,
        user_id,
        vacancy_id,
        task_type,
        task_id,
        task_set_id,
        exec_start_time,
        exec_end_time,
        prog_task_time,
        prog_task_memory,
        result,
        program_code,
        question_answers
      FROM user_solutions` + resultCondition + strConditions.join(' AND '),
      params
    )

    if (result.rows) {
      return result.rows.map(row => {
        return {
          id: row.id,
          numOfTry: row.num_of_try,
          userId: row.user_id,
          vacancyId: row.vacancy_id,
          taskType: row.task_type,
          taskId: row.task_id,
          taskSetId: row.task_set_id,
          execStartTime: row.exec_start_time,
          execEndTime: row.exec_end_time,
          progTaskTime: row.prog_task_time,
          progTaskMemory: row.prog_task_memory,
          result: row.result,
          programCode: row.program_code,
          questionAnswers: row.question_answers
        }
      })
    } else {
      console.log('Не найдено ни одного пользовательского решения с такими параметрами!')
      return undefined
    }
  }

  async getVacancyTest(conditions?: GetVacancyTestConditions): Promise<VacancyTest[] | undefined> {
    let resultCondition = ''
    let strConditions = []
    let params = []
    let index = 1

    if (conditions) {
      if (conditions.id) {
        strConditions.push(`id = $${index}`)
        params.push(conditions.id)
        index++
      }
      if (conditions.name) {
        strConditions.push(`name = $${index}`)
        params.push(conditions.name)
        index++
      }
      if (conditions.taskSetId) {
        strConditions.push(`$${index} = ANY (ids_task_set)`)
        params.push(conditions.taskSetId)
        index++
      }
    }

    if (strConditions.length > 0) {
      resultCondition = ` WHERE `
    }

    const result = await this.getDB().query(`
      SELECT
        id,
        name,
        ids_task_set
      FROM vacancy_tests` + resultCondition + strConditions.join(' AND '),
      params
    )

    if (result.rows) {
      const promises: Promise<TaskSet[] | undefined>[] = []
      const ids: number[] = []
      const temp: VacancyTest[] = result.rows.map(row => {
        row.ids_task_set.forEach((idTaskSet: number) => {
          const taskSet = this.getTaskSet({ id: idTaskSet })
          promises.push(taskSet)
          ids.push(row.id)
          // TODO: подумать, что делать с вакансиями,
          //  у которых больше нет доступа до некоторых наборов с задачами (индекс не существует)
        })

        return {
          id: row.id,
          name: row.name,
          taskSets: []
        }
      })

      const a = await Promise.all(promises)
      const answer: VacancyTest[] = []

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i]
        const taskSet = a[i]
        const vacancyTask = answer.find(t => t.id === id)
        if (vacancyTask) {
          const index = answer.indexOf(vacancyTask)
          if (taskSet) {
            answer[index].taskSets.push(taskSet[0])
          }
        } else {
          const vacancyTask = temp.find(t => t.id === id)!
          if (taskSet) {
            vacancyTask.taskSets.push(taskSet[0])
          }
          answer.push(vacancyTask)
        }
      }
      return answer
    } else {
      console.log('Не найдено ни одной вакансии с такими параметрами!')
      return undefined
    }
  }

  async getTaskSet(conditions?: GetTaskSetConditions): Promise<TaskSet[] | undefined> {
    let resultCondition = ''
    let strConditions = []
    let params = []
    let index = 1

    if (conditions) {
      if (conditions.id) {
        strConditions.push(`id = $${index}`)
        params.push(conditions.id)
        index++
      }
      if (conditions.name) {
        strConditions.push(`name = $${index}`)
        params.push(conditions.name)
        index++
      }
      if (conditions.task) {
        if ('questions' in conditions.task) {
          strConditions.push(`$${index} = ANY (ids_test_task)`)
        } else {
          strConditions.push(`$${index} = ANY (ids_prog_task)`)
        }
        params.push(conditions.task.id)
        index++
      }
      if (conditions.creator) {
        strConditions.push(`creator = $${index}`)
        params.push(conditions.creator)
        index++
      }
      if (conditions.timeOfCreation) {
        strConditions.push(`time_of_creation = $${index}`)
        params.push(new Date(conditions.timeOfCreation))
        index++
      }
      if (conditions.language) {
        strConditions.push(`language = $${index}`)
        params.push(conditions.language)
      }
    }

    if (strConditions.length > 0) {
      resultCondition = ` WHERE `
    }

    const result = await this.getDB().query(`
      SELECT
        id,
        name,
        description,
        ids_test_task,
        ids_prog_task,
        creator,
        time_limits,
        time_of_creation,
        language
      FROM task_sets` + resultCondition + strConditions.join(' AND '),
      params
    )

    if (result.rows) {
      const promisesTT: Promise<TestTask[] | undefined>[] = []
      const promisesPT: Promise<ProgTask[] | undefined>[] = []
      const idsTT: number[] = []
      const idsPT: number[] = []
      const temp: TaskSet[] = result.rows.map(row => {
        row.ids_test_task.forEach((idTestTask: number) => {
          const testTask = this.getTestTask({ id: idTestTask })
          promisesTT.push(testTask)
          idsTT.push(row.id)
          // TODO: подумать, что делать с наборами задач,
          //  у которых больше нет доступа до некоторых наборов с тестами (индекс не существует)
        })

        row.ids_prog_task.forEach((idProgTask: number) => {
          const progTask = this.getProgTask({ id: idProgTask })
          promisesPT.push(progTask)
          idsPT.push(row.id)
          // TODO: подумать, что делать с наборами задач,
          //  у которых больше нет доступа до некоторых задач по программированию (индекс не существует)
        })

        return {
          id: row.id,
          name: row.name,
          description: row.description,
          testTasks: [],
          progTasks: [],
          creator: row.creator,
          timeLimits: row.time_limits,
          timeOfCreation: row.time_of_creation,
          language: row.language
        }
      })

      const a = await Promise.all(promisesTT)
      const b = await Promise.all(promisesPT)

      const answer_temp: TaskSet[] = []
      const answer: TaskSet[] = []

      for (let i = 0; i < idsTT.length; i++) {
        const id = idsTT[i]
        const testTask = a[i]
        const taskSet = answer.find(t => t.id === id)
        if (taskSet) {
          const index = answer.indexOf(taskSet)
          if (testTask) {
            answer[index].testTasks.push(testTask[0])
          }
        } else {
          const taskSet = answer_temp.find(t => t.id === id)
          if (taskSet) {
            if (testTask) {
              taskSet.testTasks.push(testTask[0])
            }
            answer.push(taskSet)
          } else {
            const taskSet = temp.find(t => t.id === id)!
            if (testTask) {
              taskSet.testTasks.push(testTask[0])
            }
            answer.push(taskSet)
          }
        }
      }
      for (let i = 0; i < idsPT.length; i++) {
        const id = idsPT[i]
        const progTask = b[i]
        const taskSet = answer.find(t => t.id === id)
        if (taskSet) {
          const index = answer.indexOf(taskSet)
          if (progTask) {
            answer[index].progTasks.push(progTask[0])
          }
        } else {
          const taskSet = answer_temp.find(t => t.id === id)
          if (taskSet) {
            if (progTask) {
              taskSet.progTasks.push(progTask[0])
            }
            answer.push(taskSet)
          } else {
            const taskSet = temp.find(t => t.id === id)!
            if (progTask) {
              taskSet.progTasks.push(progTask[0])
            }
            answer.push(taskSet)
          }
        }
      }

      return answer
    } else {
      console.log('Не найдено ни одного набора с заданиями с такими параметрами!')
      return undefined
    }
  }

  async getProgTask(conditions?: GetProgTaskConditions): Promise<ProgTask[] | undefined> {
    let resultCondition = ''
    let strConditions = []
    let params = []
    let index = 1

    if (conditions) {
      if (conditions.id) {
        strConditions.push(`id = $${index}`)
        params.push(conditions.id)
        index++
      }
      if (conditions.name) {
        strConditions.push(`name = $${index}`)
        params.push(conditions.name)
        index++
      }
      if (conditions.complexityAssessment) {
        strConditions.push(`complexity_assessment = $${index}`)
        params.push(conditions.complexityAssessment)
      }
    }

    if (strConditions.length > 0) {
      resultCondition = ` WHERE `
    }

    const result = await this.getDB().query(`
      SELECT
        id,
        name,
        description,
        complexity_assessment,
        conditions
      FROM prog_tasks` + resultCondition + strConditions.join(' AND '),
      params
    )

    if (result.rows) {
      return result.rows.map(row => {
        const conditions: Condition[] = []
        for (let key in row.conditions) {
          conditions.push({
            language: key as ProgrammingLanguage,
            maxTime: row.conditions[key][0],
            maxMemory: row.conditions[key][1],
            codeExample: row.conditions[key][2],
            autoTests: row.conditions[key][3]
          })
        }

        return {
          id: row.id,
          name: row.name,
          description: row.description,
          complexityAssessment: row.complexity_assessment,
          conditions: conditions
        }
      })
    } else {
      console.log('Не найдено ни одной задачи по программированию с такими параметрами!')
      return undefined
    }
  }

  async getTestTask(conditions?: GetTestTaskConditions): Promise<TestTask[] | undefined> {
    let resultCondition = ''
    let strConditions = []
    let params = []
    let index = 1

    if (conditions) {
      if (conditions.id) {
        strConditions.push(`id = $${index}`)
        params.push(conditions.id)
        index++
      }
      if (conditions.name) {
        strConditions.push(`name = $${index}`)
        params.push(conditions.name)
        index++
      }
      if (conditions.testQuestion) {
        strConditions.push(`$${index} = ANY (ids_question)`)
        params.push(conditions.testQuestion)
      }
    }

    if (strConditions.length > 0) {
      resultCondition = ` WHERE `
    }

    const result = await this.getDB().query(`
      SELECT
        id,
        name,
        description,
        ids_question,
        exec_time
      FROM test_tasks` + resultCondition + strConditions.join(' AND '),
      params
    )

    if (result.rows) {
      const promises: Promise<TestQuestion[] | undefined>[] = []
      const ids: number[] = []
      const temp: TestTask[] = result.rows.map(row => {
        row.ids_question.forEach((idQuestion: number) => {
          const testQuestion = this.getTestQuestion({ id: idQuestion })
          promises.push(testQuestion)
          ids.push(row.id)
          // TODO: подумать, что делать с тестами,
          //  у которых больше нет доступа до некоторых вопросов (индекс не существует)
        })

        return {
          id: row.id,
          name: row.name,
          description: row.description,
          questions: [],
          execTime: row.exec_time
        }
      })

      const a = await Promise.all(promises)
      const answer: TestTask[] = []

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i]
        const question = a[i]
        const testTask = answer.find(t => t.id === id)
        if (testTask) {
          const index = answer.indexOf(testTask)
          if (question) {
            answer[index].questions.push(question[0])
          }
        } else {
          const testTask = temp.find(t => t.id === id)!
          if (question) {
            testTask.questions.push(question[0])
          }
          answer.push(testTask)
        }
      }
      return answer
    } else {
      console.log('Не найдено ни одного набора с тестовыми вопросами с такими параметрами!')
      return undefined
    }
  }

  async getTestQuestion(conditions?: GetTestQuestionConditions): Promise<TestQuestion[] | undefined> {
    let resultCondition = ''
    let strConditions = []
    let params = []
    let index = 1

    if (conditions) {
      if (conditions.id) {
        strConditions.push(`id = $${index}`)
        params.push(conditions.id)
        index++
      }
      if (conditions.description) {
        strConditions.push(`description = $${index}`)
        params.push(conditions.description)
        index++
      }
      if (conditions.points) {
        strConditions.push(`points = $${index}`)
        params.push(conditions.points)
      }
    }

    if (strConditions.length > 0) {
      resultCondition = ` WHERE `
    }

    const result = await this.getDB().query(`
      SELECT
        id,
        description,
        points,
        wrong_answers,
        correct_answers
      FROM test_questions` + resultCondition + strConditions.join(' AND '),
      params
    )

    if (result.rows) {
      return result.rows.map(row => {
        return {
          id: row.id,
          description: row.description,
          points: row.points,
          wrongAnswers: row.wrong_answers,
          correctAnswers: row.correct_answers
        }
      })
    } else {
      console.log('Не найдено ни одного тестового вопроса с такими параметрами!')
      return undefined
    }
  }

  async updateUser(user: User): Promise<void> {
    const vacancies: number[] = user.vacancies.map(vacancy => vacancy.vacancyId)

    try {
      await this.getDB().query(`
        UPDATE users SET
          access_rights = $2,
          surname = $3,
          name = $4,
          patronymic = $5,
          email = $6,
          password = $7,
          actual_link = $8,
          start_link_timestamp = $9,
          end_link_timestamp = $10,
          vacancies = $11
        WHERE id = $1`,
        [
          user.id,
          user.accessRights,
          user.surname,
          user.name,
          user.patronymic,
          user.email,
          user.password,
          user.actualLink,
          user.startLinkTimestamp,
          user.endLinkTimestamp,
          vacancies
        ]
      )
    } catch (err) {
      console.log('updateUser', err)
    }
  }

  async updateUserSolution(userSolution: UserSolution): Promise<void> {
    try {
      await this.getDB().query(`
        UPDATE user_solutions SET
          user_id = $2,
          task_type = $3,
          task_id = $4,
          task_set_id = $5,
          exec_start_time = $6,
          exec_end_time = $7,
          prog_task_time = $8,
          prog_task_memory = $9,
          result = $10,
          program_code = $11,
          question_answers = $12,
          num_of_try = $13,
          vacancy_id = $14
        WHERE id = $1`,
        [
          userSolution.id,
          userSolution.userId,
          userSolution.taskType,
          userSolution.taskId,
          userSolution.taskSetId,
          new Date(userSolution.execStartTime),
          new Date(userSolution.execEndTime),
          userSolution.progTaskTime ? Math.round(userSolution.progTaskTime * 1000) : undefined,
          userSolution.progTaskMemory,
          userSolution.result,
          userSolution.programCode,
          userSolution.questionAnswers,
          userSolution.numOfTry,
          userSolution.vacancyId
        ]
      )
    } catch (err) {
      console.log('updateUserSolution', err)
    }
  }

  async updateVacancyTest(vacancyTest: VacancyTest): Promise<void> {
    const idsVacancyTest: number[] = vacancyTest.taskSets.map(taskSet => taskSet.id!)

    try {
      await this.getDB().query(`
        UPDATE vacancy_tests SET
          name = $2,
          ids_task_set = $3
        WHERE id = $1`,
        [
          vacancyTest.id,
          vacancyTest.name,
          idsVacancyTest
        ]
      )
    } catch (err) {
      console.log('updateVacancyTest', err)
    }
  }

  async updateTaskSet(taskSet: TaskSet): Promise<void> {
    const idsTestTask: number[] = taskSet.testTasks.map(testTask => testTask.id!)
    const idsProgTask: number[] = taskSet.progTasks.map(progTask => progTask.id!)

    try {
      await this.getDB().query(`
        UPDATE task_sets SET
          name = $2,
          description = $3,
          ids_test_task = $4,
          ids_prog_task = $5,
          creator = $6,
          time_of_creation = $7,
          language = $8,
          time_limits = $9
        WHERE id = $1`,
        [
          taskSet.id,
          taskSet.name,
          taskSet.description,
          idsTestTask,
          idsProgTask,
          taskSet.creator,
          new Date(taskSet.timeOfCreation),
          taskSet.language,
          taskSet.timeLimits
        ]
      )
    } catch (err) {
      console.log('updateTaskSet', err)
    }
  }

  async updateProgTask(progTask: ProgTask): Promise<void> {
    const conditions: {[k: string]: [number, number, string, string]} = {}
    progTask.conditions.forEach(condition => {
      conditions[condition.language] = [condition.maxTime, condition.maxMemory, condition.codeExample, condition.autoTests]
    })

    try {
      await this.getDB().query(`
        UPDATE prog_tasks SET
          name = $2,
          description = $3,
          complexity_assessment = $4,
          conditions = $5
        WHERE id = $1`,
        [
          progTask.id,
          progTask.name,
          progTask.description,
          progTask.complexityAssessment,
          conditions
        ]
      )
    } catch (err) {
      console.log('updateProgTask', err)
    }
  }

  async updateTestTask(testTask: TestTask): Promise<void> {
    try {
      await this.getDB().query(`
        UPDATE test_tasks SET
          name = $2,
          description = $3,
          ids_question = $4,
          exec_time = $5
        WHERE id = $1`,
        [
          testTask.id,
          testTask.name,
          testTask.description,
          testTask.questions.map(test => test.id),
          testTask.execTime
        ]
      )
    } catch (err) {
      console.log('updateTestTask', err)
    }
  }

  async updateTestQuestion(testQuestion: TestQuestion): Promise<void> {
    try {
      await this.getDB().query(`
        UPDATE test_questions SET
          description = $2,
          points = $3,
          wrong_answers = $4,
          correct_answers = $5
        WHERE id = $1`,
        [
          testQuestion.id,
          testQuestion.description,
          testQuestion.points,
          testQuestion.wrongAnswers,
          testQuestion.correctAnswers
        ]
      )
    } catch (err) {
      console.log('updateTestQuestion', err)
    }
  }

  /**
   * Функция, вызывающая обновление поля актуальной ссылки авторизации (user.actual_link) в БД
   *  с использованием библиотеки fast_sha256, проверяя, что нет повторяющейся ссылки
   * @param user Идентификатор пользователя
   */
  async updateUserActualLink(user: UserID): Promise<{ actualLink: string }> {
    try {
      const maxInt: number = 2147483647
      let linksInUse: { rowCount: any }
      let actualLink: string = ''

      do {
        const rawData: Uint8Array = new TextEncoder().encode(user.id.toString() + randomInt(maxInt).toString())
        const cryptData = sha256(rawData)
        cryptData.forEach((element, index) => {cryptData[index] = element / 255 * 26 + 97})
        actualLink = new TextDecoder('utf-8').decode(cryptData)

        linksInUse = await this.getDB().query(`
          SELECT id
          FROM users
          WHERE id = $1 AND actual_link = $2`,
        [
          user.id,
          actualLink
        ])

      } while (linksInUse.rowCount != 0)

      await this.getDB().query(`
        UPDATE users SET
          actual_link = $2
        WHERE id = $1`,
        [
          user.id,
          actualLink
        ]
      )

      return { actualLink: actualLink }
    } catch (err) {
      console.log('updateUserActualLink', err)
      return { actualLink: '' }
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this.getDB().query(`
        DELETE FROM users
        WHERE id = $1`,
        [
          id
        ]
      )
    } catch (err) {
      console.log('deleteUser', err)
    }
  }

  async deleteUserSolution(id: number): Promise<void> {
    try {
      await this.getDB().query(`
        DELETE FROM user_solutions
        WHERE id = $1`,
        [
          id
        ]
      )
    } catch (err) {
      console.log('deleteUserSolution', err)
    }
  }

  async deleteVacancyTest(id: number): Promise<void> {
    try {
      await this.getDB().query(`
        DELETE FROM vacancy_tests
        WHERE id = $1`,
        [
          id
        ]
      )
    } catch (err) {
      console.log('deleteVacancyTest', err)
    }
  }

  async deleteTaskSet(id: number): Promise<void> {
    try {
      await this.getDB().query(`
        DELETE FROM task_sets
        WHERE id = $1`,
        [
          id
        ]
      )
    } catch (err) {
      console.log('deleteTaskSet', err)
    }
  }

  async deleteProgTask(id: number): Promise<void> {
    try {
      await this.getDB().query(`
        DELETE FROM prog_tasks
        WHERE id = $1`,
        [
          id
        ]
      )
    } catch (err) {
      console.log('deleteProgTask', err)
    }
  }

  async deleteTestTask(id: number): Promise<void> {
    try {
      await this.getDB().query(`
        DELETE FROM test_tasks
        WHERE id = $1`,
        [
          id
        ]
      )
    } catch (err) {
      console.log('deleteTestTask', err)
    }
  }

  async deleteTestQuestion(id: number): Promise<void> {
    try {
      await this.getDB().query(`
        DELETE FROM test_questions
        WHERE id = $1`,
        [
          id
        ]
      )
    } catch (err) {
      console.log('deleteTestQuestion', err)
    }
  }

  async getNumOfTry(userId: number, vacancy: Vacancy): Promise<number | undefined> {
    const user = await this.getUser({ id: userId })
    if (user && user.length > 0) {
      const resultVacancyTest = user[0].vacancies.find(v => v.vacancyName === vacancy)
      if (resultVacancyTest && resultVacancyTest.userSolutions.length > 0) {
        return Math.max(...resultVacancyTest.userSolutions.map(uS => uS.numOfTry))
      } else {
        return undefined
      }
    }
  }

  private getDB(): Pool {
    if (this.db) {
      return this.db
    } else {
      throw new Error('Отсутствует подключение к PostgreSQL!')
    }
  }
}