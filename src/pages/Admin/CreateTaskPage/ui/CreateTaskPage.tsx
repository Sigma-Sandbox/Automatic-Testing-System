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

interface CreateTaskPageProps {
  className?: string
}

export const CreateTaskPage: React.FC<CreateTaskPageProps> = (props) => {
  const { className = '' } = props
  const testTasksInit = useSelector(getAllTestTask)
  const progTasksInit = useSelector(getAllProgTask)
  const [testTasks, setTestTasks] = useState<TestTask[]>([])
  const [progTasks, setProgTasks] = useState<ProgTask[]>([])

  const [langProg, setLangProg] = useState<{ [key: string]: string }>({})
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
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

  return (
    <div className={classNames(cls.createTaskPage, {}, ['container', className])}>
      <div className={cls.navbar}>
        <CreateNavbar langs={Object.values(langProg)} changeList={filterTasks} />
      </div>

      <div className={cls.tasksWrap}>
        <div className={cls.tasks}>
          {testTasks.map((testTask) => (
            <CardTask task={testTask} />
          ))}
        </div>
        <div className={cls.tasks}>
          {progTasks.map((progTask) => (
            <CardTask task={progTask} />
          ))}
        </div>
      </div>
    </div>
  )
}
