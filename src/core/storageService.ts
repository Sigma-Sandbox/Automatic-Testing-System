import {
  GetProgTaskConditions,
  GetTaskSetConditions,
  GetTestQuestionConditions,
  GetTestTaskConditions,
  GetUserConditions,
  GetUserSolutionConditions,
  IStorageService,
} from './interfaces'
import {Pool} from 'pg'
import {Condition, ProgTask, TaskSet, TestQuestion, TestTask, User, UserSolution} from './entities'
import {ProgrammingLanguage} from './enums'

export class StorageService implements IStorageService {
  db: Pool | undefined = undefined

  constructor() {}

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
        vacancies JSONB
      );

      CREATE TABLE IF NOT EXISTS user_solutions
      (
        id SERIAL4 PRIMARY KEY ,
        user_id INT,
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

      CREATE TABLE IF NOT EXISTS task_sets
      (
        id SERIAL4 PRIMARY KEY ,
        name VARCHAR(64),
        description TEXT,
        ids_test_task INT[],
        ids_prog_task INT[],
        creator VARCHAR(64),
        time_of_creation TIMESTAMPTZ,
        language TEXT[] NULL
      );

      CREATE TABLE IF NOT EXISTS prog_tasks
      (
        id SERIAL4 PRIMARY KEY ,
        name VARCHAR(64),
        description TEXT,
        auto_tests TEXT[],
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
      );`)
  }

  async addUser(user: User): Promise<void> {
    const vacancies: {[vacancy: string]: {[numOfTry: string]: number[]}} = {}
    for (const vacancy in user.vacancies) {
      const map = user.vacancies[vacancy]
      const taskSetsIds: {[numOfTry: string]: number[]} = {}
      for (const numOfTry in map) {
        taskSetsIds[String(numOfTry)] = map[numOfTry].map((taskSet: TaskSet) => taskSet.id!)
      }
      vacancies[vacancy] = taskSetsIds
    }

    try {
      await this.getDB().query(
        `
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
          vacancies,
        ]
      )
    } catch (err) {
      console.log('addUser', err)
    }
  }

  async addUserSolution(userSolution: UserSolution): Promise<void> {
    try {
      await this.getDB().query(
        `
        INSERT INTO user_solutions
        VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
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
        ]
      )
    } catch (err) {
      console.log('addUserSolution', err)
    }
  }

  async addTaskSet(taskSet: TaskSet): Promise<void> {
    const idsTestTask: number[] = taskSet.testTasks.map((testTask) => testTask.id!)
    const idsProgTask: number[] = taskSet.progTasks.map((progTask) => progTask.id!)

    try {
      await this.getDB().query(
        `
        INSERT INTO task_sets
        VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7)`,
        [
          taskSet.name,
          taskSet.description,
          idsTestTask,
          idsProgTask,
          taskSet.creator,
          new Date(taskSet.timeOfCreation),
          taskSet.language,
        ]
      )
    } catch (err) {
      console.log('addTaskSet', err)
    }
  }

  async addProgTask(progTask: ProgTask): Promise<void> {
    const conditions: {[k: string]: [number, number]} = {}
    progTask.conditions.forEach((condition) => {
      conditions[condition.language] = [condition.maxTime, condition.maxMemory]
    })

    try {
      await this.getDB().query(
        `
        INSERT INTO prog_tasks
        VALUES(DEFAULT, $1, $2, $3, $4, $5)`,
        [
          progTask.name,
          progTask.description,
          progTask.autoTests,
          progTask.complexityAssessment,
          conditions,
        ]
      )
    } catch (err) {
      console.log('addProgTask', err)
    }
  }

  async addTestTask(testTask: TestTask): Promise<void> {
    try {
      await this.getDB().query(
        `
        INSERT INTO test_tasks
        VALUES(DEFAULT, $1, $2, $3, $4)`,
        [
          testTask.name,
          testTask.description,
          testTask.questions.map((test) => test.id),
          testTask.execTime,
        ]
      )
    } catch (err) {
      console.log('addTestTask', err)
    }
  }

  async addTestQuestion(testQuestion: TestQuestion): Promise<void> {
    try {
      await this.getDB().query(
        `
        INSERT INTO test_questions
        VALUES(DEFAULT, $1, $2, $3, $4)`,
        [
          testQuestion.description,
          testQuestion.points,
          testQuestion.wrongAnswers,
          testQuestion.correctAnswers,
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
      if (conditions.vacancy) {
        strConditions.push(`vacancies ? $${index}`)
        params.push(conditions.vacancy)
      }
    }

    if (strConditions.length > 0) {
      resultCondition = ` WHERE `
    }

    const result = await this.getDB().query(
      `
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
      FROM users` +
        resultCondition +
        strConditions.join(' AND '),
      params
    )

    if (result.rows) {
      const promises: Promise<TaskSet[] | undefined>[] = []
      const numOfTries: number[] = []
      const vacancies: string[] = []
      const ids: number[] = []
      const temp: User[] = result.rows.map((row) => {
        for (const vac in row.vacancies) {
          for (const numOfTry in row.vacancies[vac]) {
            for (const id of row.vacancies[vac][numOfTry]) {
              const taskSet = this.getTaskSet({id: id})
              promises.push(taskSet)
              numOfTries.push(+numOfTry)
              vacancies.push(vac)
              ids.push(row.id)
              // TODO: подумать, что делать с пользователями,
              //  у которых больше нет доступа до некоторых наборов с задачами (индекс не существует)
            }
          }
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
          vacancies: {},
        }
      })

      const a = await Promise.all(promises)
      const answer: User[] = []

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i]
        const vac = vacancies[i]
        const numOfTry = numOfTries[i]
        const taskSet = a[i]
        const user = answer.find((t) => t.id === id)
        if (user) {
          const index = answer.indexOf(user)
          const findVac = answer[index].vacancies[vac]
          if (findVac === undefined) {
            answer[index].vacancies[vac] = {}
          }
          const array = answer[index].vacancies[vac][+numOfTry]
          if (array) {
            array.push(taskSet![0])
            answer[index].vacancies[vac][+numOfTry] = array
          } else {
            answer[index].vacancies[vac][+numOfTry] = taskSet!
          }
        } else {
          const user = temp.find((t) => t.id === id)!
          user.vacancies[vac] = {[+numOfTry]: taskSet!}
          answer.push(user)
        }
      }
      return answer
    } else {
      console.log('Не найдено ни одного пользователя с такими параметрами!')
      return undefined
    }
  }

  async getUserSolution(
    conditions?: GetUserSolutionConditions
  ): Promise<UserSolution[] | undefined> {
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
      if (conditions.userId) {
        strConditions.push(`user_id = $${index}`)
        params.push(conditions.userId)
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

    const result = await this.getDB().query(
      `
      SELECT
        id,
        user_id,
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
      FROM user_solutions` +
        resultCondition +
        strConditions.join(' AND '),
      params
    )

    if (result.rows) {
      return result.rows.map((row) => {
        return {
          id: row.id,
          userId: row.user_id,
          taskType: row.task_type,
          taskId: row.task_id,
          taskSetId: row.task_set_id,
          execStartTime: row.exec_start_time,
          execEndTime: row.exec_end_time,
          progTaskTime: row.prog_task_time,
          progTaskMemory: row.prog_task_memory,
          result: row.result,
          programCode: row.program_code,
          questionAnswers: row.question_answers,
        }
      })
    } else {
      console.log('Не найдено ни одного пользовательского решения с такими параметрами!')
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
          strConditions.push(`$${index} IN ids_test_task`)
        } else {
          strConditions.push(`$${index} IN ids_prog_task`)
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

    const result = await this.getDB().query(
      `
      SELECT
        id,
        name,
        description,
        ids_test_task,
        ids_prog_task,
        creator,
        time_of_creation,
        language
      FROM task_sets` +
        resultCondition +
        strConditions.join(' AND '),
      params
    )

    if (result.rows) {
      const promisesTT: Promise<TestTask[] | undefined>[] = []
      const promisesPT: Promise<ProgTask[] | undefined>[] = []
      const idsTT: number[] = []
      const idsPT: number[] = []
      const temp: TaskSet[] = result.rows.map((row) => {
        row.ids_test_task.forEach((idTestTask: number) => {
          const testTask = this.getTestTask({id: idTestTask})
          promisesTT.push(testTask)
          idsTT.push(row.id)
          // TODO: подумать, что делать с наборами задач,
          //  у которых больше нет доступа до некоторых наборов с тестами (индекс не существует)
        })

        row.ids_prog_task.forEach((idProgTask: number) => {
          const progTask = this.getProgTask({id: idProgTask})
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
          timeOfCreation: row.time_of_creation,
          language: row.language,
        }
      })

      const a = await Promise.all(promisesTT)
      const b = await Promise.all(promisesPT)

      const answer_temp: TaskSet[] = []
      const answer: TaskSet[] = []

      for (let i = 0; i < idsTT.length; i++) {
        const id = idsTT[i]
        const testTask = a[i]
        const taskSet = answer_temp.find((t) => t.id === id)
        if (taskSet) {
          const index = answer_temp.indexOf(taskSet)
          answer_temp[index].testTasks.push(testTask as unknown as TestTask)
        } else {
          const taskSet = temp.find((t) => t.id === id)!
          taskSet.testTasks.push(testTask as unknown as TestTask)
          answer_temp.push(taskSet)
        }
      }
      for (let i = 0; i < idsPT.length; i++) {
        const id = idsPT[i]
        const progTask = b[i]
        const taskSet = answer.find((t) => t.id === id)
        if (taskSet) {
          const index = answer.indexOf(taskSet)
          answer[index].progTasks.push(progTask as unknown as ProgTask)
        } else {
          const taskSet = answer_temp.find((t) => t.id === id)!
          taskSet.progTasks.push(progTask as unknown as ProgTask)
          answer.push(taskSet)
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

    const result = await this.getDB().query(
      `
      SELECT
        id,
        name,
        description,
        auto_tests,
        complexity_assessment,
        conditions
      FROM prog_tasks` +
        resultCondition +
        strConditions.join(' AND '),
      params
    )

    if (result.rows) {
      return result.rows.map((row) => {
        const conditions: Condition[] = []
        for (let key in row.conditions) {
          conditions.push({
            language: key as ProgrammingLanguage,
            maxTime: row.conditions[key][0],
            maxMemory: row.conditions[key][1],
          })
        }

        return {
          id: row.id,
          name: row.name,
          description: row.description,
          autoTests: row.auto_tests,
          complexityAssessment: row.complexity_assessment,
          conditions: conditions,
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
        strConditions.push(`$${index} IN ids_question`)
        params.push(conditions.testQuestion)
      }
    }

    if (strConditions.length > 0) {
      resultCondition = ` WHERE `
    }

    const result = await this.getDB().query(
      `
      SELECT
        id,
        name,
        description,
        ids_question,
        exec_time
      FROM test_tasks` +
        resultCondition +
        strConditions.join(' AND '),
      params
    )

    if (result.rows) {
      const promises: Promise<TestQuestion[] | undefined>[] = []
      const ids: number[] = []
      const temp: TestTask[] = result.rows.map((row) => {
        row.ids_question.forEach((idQuestion: number) => {
          const testQuestion = this.getTestQuestion({id: idQuestion})
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
          execTime: row.exec_time,
        }
      })

      const a = await Promise.all(promises)
      const answer: TestTask[] = []

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i]
        const question = a[i]
        const testTask = answer.find((t) => t.id === id)
        if (testTask) {
          const index = answer.indexOf(testTask)
          answer[index].questions.push(question as unknown as TestQuestion)
        } else {
          const testTask = temp.find((t) => t.id === id)!
          testTask.questions.push(question as unknown as TestQuestion)
          answer.push(testTask)
        }
      }
      return answer
    } else {
      console.log('Не найдено ни одного набора с тестовыми вопросами с такими параметрами!')
      return undefined
    }
  }

  async getTestQuestion(
    conditions?: GetTestQuestionConditions
  ): Promise<TestQuestion[] | undefined> {
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

    const result = await this.getDB().query(
      `
      SELECT
        id,
        description,
        points,
        wrong_answers,
        correct_answers
      FROM test_questions` +
        resultCondition +
        strConditions.join(' AND '),
      params
    )

    if (result.rows) {
      return result.rows.map((row) => {
        return {
          id: row.id,
          description: row.description,
          points: row.points,
          wrongAnswers: row.wrong_answers,
          correctAnswers: row.correct_answers,
        }
      })
    } else {
      console.log('Не найдено ни одного тестового вопроса с такими параметрами!')
      return undefined
    }
  }

  async updateUser(user: User): Promise<void> {
    const vacancies: {[vacancy: string]: {[numOfTry: string]: number[]}} = {}
    for (const vacancy in user.vacancies) {
      const map = user.vacancies[vacancy]
      const taskSetsIds: {[numOfTry: string]: number[]} = {}
      for (const numOfTry in map) {
        taskSetsIds[String(numOfTry)] = map[numOfTry].map((taskSet: TaskSet) => taskSet.id!)
      }
      vacancies[vacancy] = taskSetsIds
    }

    try {
      await this.getDB().query(
        `
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
          vacancies,
        ]
      )
    } catch (err) {
      console.log('updateUser', err)
    }
  }

  async updateUserSolution(userSolution: UserSolution): Promise<void> {
    try {
      await this.getDB().query(
        `
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
          question_answers = $12
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
        ]
      )
    } catch (err) {
      console.log('updateUserSolution', err)
    }
  }

  async updateTaskSet(taskSet: TaskSet): Promise<void> {
    const idsTestTask: number[] = taskSet.testTasks.map((testTask) => testTask.id!)
    const idsProgTask: number[] = taskSet.progTasks.map((progTask) => progTask.id!)

    try {
      await this.getDB().query(
        `
        UPDATE task_sets SET
          name = $2,
          description = $3,
          ids_test_task = $4,
          ids_prog_task = $5,
          creator = $6,
          time_of_creation = $7,
          language = $8
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
        ]
      )
    } catch (err) {
      console.log('updateTaskSet', err)
    }
  }

  async updateProgTask(progTask: ProgTask): Promise<void> {
    const conditions: {[k: string]: [number, number]} = {}
    progTask.conditions.forEach((condition) => {
      conditions[condition.language] = [condition.maxTime, condition.maxMemory]
    })

    try {
      await this.getDB().query(
        `
        UPDATE prog_tasks SET
          name = $2,
          description = $3,
          auto_tests = $4,
          complexity_assessment = $5,
          conditions = $6
        WHERE id = $1`,
        [
          progTask.id,
          progTask.name,
          progTask.description,
          progTask.autoTests,
          progTask.complexityAssessment,
          conditions,
        ]
      )
    } catch (err) {
      console.log('updateProgTask', err)
    }
  }

  async updateTestTask(testTask: TestTask): Promise<void> {
    try {
      await this.getDB().query(
        `
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
          testTask.questions.map((test) => test.id),
          testTask.execTime,
        ]
      )
    } catch (err) {
      console.log('updateTestTask', err)
    }
  }

  async updateTestQuestion(testQuestion: TestQuestion): Promise<void> {
    try {
      await this.getDB().query(
        `
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
          testQuestion.correctAnswers,
        ]
      )
    } catch (err) {
      console.log('updateTestQuestion', err)
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this.getDB().query(
        `
        DELETE FROM users
        WHERE id = $1`,
        [id]
      )
    } catch (err) {
      console.log('deleteUser', err)
    }
  }

  async deleteUserSolution(id: number): Promise<void> {
    try {
      await this.getDB().query(
        `
        DELETE FROM user_solutions
        WHERE id = $1`,
        [id]
      )
    } catch (err) {
      console.log('deleteUserSolution', err)
    }
  }

  async deleteTaskSet(id: number): Promise<void> {
    try {
      await this.getDB().query(
        `
        DELETE FROM task_sets
        WHERE id = $1`,
        [id]
      )
    } catch (err) {
      console.log('deleteTaskSet', err)
    }
  }

  async deleteProgTask(id: number): Promise<void> {
    try {
      await this.getDB().query(
        `
        DELETE FROM prog_tasks
        WHERE id = $1`,
        [id]
      )
    } catch (err) {
      console.log('deleteProgTask', err)
    }
  }

  async deleteTestTask(id: number): Promise<void> {
    try {
      await this.getDB().query(
        `
        DELETE FROM test_tasks
        WHERE id = $1`,
        [id]
      )
    } catch (err) {
      console.log('deleteTestTask', err)
    }
  }

  async deleteTestQuestion(id: number): Promise<void> {
    try {
      await this.getDB().query(
        `
        DELETE FROM test_questions
        WHERE id = $1`,
        [id]
      )
    } catch (err) {
      console.log('deleteTestQuestion', err)
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
