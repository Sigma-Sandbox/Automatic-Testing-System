import React, { useEffect, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CreateTaskPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTestTaskList, getAllTestTask } from 'entities/Admin/TestTask'
import { fetchProgTaskList, getAllProgTask } from 'entities/Admin/ProgTask'
import { AppDispatch } from 'app/providers/StoreProvider/config/store'
import { CardTask } from './CardTask/CardTask'
import { CreateNavbar } from './CreateNavbar/CreateNavbar'
import { ProgTask, TestTask } from 'entities/Candidate/TestTask'
import { Button, ColorButton, ThemeButton } from 'shared/ui/Button/Button'

import { ReactComponent as PlusSvg } from 'shared/assets/icon/plus.svg'
import { ReactComponent as CodeSvg } from 'shared/assets/icon/codeCreate.svg'
import { ReactComponent as TestSvg } from 'shared/assets/icon/testCreate.svg'
import QuestSvg from 'shared/assets/icon/quest.png'
import { NotFoundElements } from 'shared/ui/NotFoundElements/NotFoundElements'
import { CreateAndEditCodeTask } from 'features/CreateAndEditCodeTask'
import { type } from 'os'
import { ToastContainer } from 'react-toastify'
import { CreateAndEditTestTask, QuestionCreator } from 'features/CreateAndEditTestTask'
import { useAuthLocalStrorage } from 'shared/lib/hooks/useAuthLocalStrorage/useAuthLocalStrorage'

interface CreateTaskPageProps {
  className?: string
}
export enum typeTaskPopup {
  PROG = 'prog',
  TEST = 'test',
  QUEST = 'quest',
  NULL = 'null',
}
export interface TaskCreatePopupStatus {
  type: typeTaskPopup
  prop: TestTask | ProgTask | null
}

export const CreateTaskPage: React.FC<CreateTaskPageProps> = (props) => {
  const { className = '' } = props
  const testTasksInit = useSelector(getAllTestTask)
  const progTasksInit = useSelector(getAllProgTask)
  const [testTasks, setTestTasks] = useState<TestTask[]>([])
  const [progTasks, setProgTasks] = useState<ProgTask[]>([])
  const [statusPopup, setStatusPopup] = useState<TaskCreatePopupStatus>({ type: typeTaskPopup.NULL, prop: null })
  const [checkAuthLocalStorage, clearAuthData] = useAuthLocalStrorage()
  const [langProg, setLangProg] = useState<{ [key: string]: string }>({})
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    checkAuthLocalStorage()

    if (testTasksInit.length === 0 || progTasksInit.length === 0) {
      dispatch(fetchProgTaskList({}))
      dispatch(fetchTestTaskList({}))
    }
  }, [])

  const filterTasks = (newProgList: ProgTask[] | null, newTestList: TestTask[] | null) => {
    if (newProgList) {
      setProgTasks(newProgList)
    }
    if (newTestList) {
      setTestTasks(newTestList)
    }
  }
  const testTasksComponents = useMemo(() => {
    const components: TestTask[] = []
    testTasksInit.forEach((testTask) => {
      components.push(testTask)
    })
    setTestTasks(components)
    return components
  }, [testTasksInit])

  const progTasksComponents = useMemo(() => {
    const components: ProgTask[] = []
    const langs: { [key: string]: string } = {}
    progTasksInit.forEach((progTask) => {
      components.push(progTask)
      progTask.conditions.forEach((cond) => (langs[cond.language] = cond.language))
    })
    setLangProg(langs)
    setProgTasks(components)
    return components
  }, [progTasksInit])

  const startTaskCreate = (typeProp: typeTaskPopup, prop: TestTask | ProgTask | null) => {
    setStatusPopup({ type: typeProp, prop })
  }
  const finishTaskCreate = () => {
    setStatusPopup({ type: typeTaskPopup.NULL, prop: null })
  }

  const popupTabShow = useMemo(() => {
    switch (statusPopup.type) {
      case typeTaskPopup.PROG:
        if (statusPopup.prop === null || 'conditions' in statusPopup.prop) {
          return <CreateAndEditCodeTask task={statusPopup.prop} closeModal={finishTaskCreate} />
        }
        break
      case typeTaskPopup.TEST:
        if (statusPopup.prop === null || 'questions' in statusPopup.prop) {
          return <CreateAndEditTestTask closeModal={finishTaskCreate} test={statusPopup.prop} />
        }
        break
      case typeTaskPopup.QUEST:
        return <QuestionCreator closeModal={finishTaskCreate} />
        break
      default:
        return ''
    }
  }, [statusPopup])

  return (
    <div className={classNames(cls.createTaskPage, {}, ['container', className])}>
      <div className={cls.navbar}>
        {popupTabShow}
        <div className={classNames(cls.createBtns)}>
          <Button
            className={classNames(cls.createBtn, {}, [cls.createQuest])}
            color={ColorButton.PRIMARY_COLOR}
            theme={ThemeButton.BACKGROUND}
            onClick={() => startTaskCreate(typeTaskPopup.QUEST, null)}
          >
            <img src={QuestSvg} alt="question" />
          </Button>
          <Button
            className={classNames(cls.createBtn, {}, [cls.createTest])}
            color={ColorButton.PRIMARY_COLOR}
            theme={ThemeButton.BACKGROUND}
            onClick={() => startTaskCreate(typeTaskPopup.TEST, null)}
          >
            <TestSvg />
          </Button>
          <div className={classNames(cls.plusImg)}>
            <PlusSvg />
          </div>

          <Button
            className={classNames(cls.createBtn, {}, [cls.createCode])}
            color={ColorButton.PRIMARY_COLOR}
            theme={ThemeButton.BACKGROUND}
            onClick={() => startTaskCreate(typeTaskPopup.PROG, null)}
          >
            <CodeSvg />
          </Button>
        </div>
        <CreateNavbar langs={Object.values(langProg)} changeList={filterTasks} />
      </div>
      <div className={cls.tasksWrap}>
        <div className={classNames(cls.tasks, {}, ['custom_scroll'])}>
          {testTasks.length > 0 ? (
            testTasks.map((testTask) => (
              <CardTask
                key={testTask.id}
                editTask={(task: ProgTask | TestTask) => startTaskCreate(typeTaskPopup.TEST, task)}
                task={testTask}
                afterDelete={() => {
                  dispatch(fetchProgTaskList({}))
                  dispatch(fetchTestTaskList({}))
                }}
              />
            ))
          ) : (
            <NotFoundElements text="Тесты не найдены" />
          )}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className={classNames(cls.tasks, {}, ['custom_scroll'])}>
          {progTasks.length > 0 ? (
            progTasks.map((progTask) => (
              <CardTask
                key={progTask.id}
                editTask={(task: ProgTask | TestTask) => startTaskCreate(typeTaskPopup.PROG, task)}
                task={progTask}
                afterDelete={() => {
                  dispatch(fetchProgTaskList({}))
                  dispatch(fetchTestTaskList({}))
                }}
              />
            ))
          ) : (
            <NotFoundElements text="Задачи не найдены" />
          )}
        </div>
      </div>
    </div>
  )
}
