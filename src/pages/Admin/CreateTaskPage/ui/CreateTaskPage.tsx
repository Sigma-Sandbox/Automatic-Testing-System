import React, { useEffect, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CreateTaskPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTestTaskList, getAllTestTask } from 'entities/Admin/TestTask'
import { fetchProgTaskList, getAllProgTask } from 'entities/Admin/ProgTask'
import { AppDispatch } from 'app/providers/StoreProvider/config/store'
import { CardTask } from './CardTask/CardTask'

interface CreateTaskPageProps {
  className?: string
}

export const CreateTaskPage: React.FC<CreateTaskPageProps> = (props) => {
  const { className = '' } = props
  const testTasks = useSelector(getAllTestTask)
  const progTasks = useSelector(getAllProgTask)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (testTasks.length === 0 || progTasks.length === 0) {
      dispatch(fetchProgTaskList({}))
      dispatch(fetchTestTaskList({}))
    }
  }, [])

  const testTasksComponents = useMemo(() => {
    const components: JSX.Element[] = []
    return testTasks.map((testTask) => <CardTask task={testTask} />)
  }, [testTasks])
  const progTasksComponents = useMemo(() => {
    const components: JSX.Element[] = []
    return progTasks.map((progTask) => <CardTask task={progTask} />)
  }, [progTasks])

  return (
    <div className={classNames(cls.createTaskPage, {}, ['container', className])}>
      <div className={cls.navbar}></div>

      <div className={cls.tasksWrap}>
        <div className={cls.tasks}>{testTasksComponents}</div>
        <div className={cls.tasks}>{progTasksComponents}</div>
      </div>
    </div>
  )
}
