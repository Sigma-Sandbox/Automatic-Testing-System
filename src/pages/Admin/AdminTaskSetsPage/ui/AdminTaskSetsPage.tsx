import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AdminTaskSetsPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider'
import { cardEditStatus } from 'features/CreateAndEditCard'
import { AppDispatch } from 'app/providers/StoreProvider/config/store'
import { SearchField } from 'features/SearchAndFilterTab'
import { Button, SizeButton } from 'shared/ui/Button/Button'
import { Loader } from 'shared/ui/Loader/Loader'
import { fetchTaskSetsData, getTaskSets } from 'entities/Admin/TaskSets'
import { TaskSet } from 'entities/Candidate/TestTask'
import { TaskSetCard } from 'widgets/Admin/TaskSetCard/ui/TaskSetCard'
import { CreateAndEditTaskSet } from 'features/CreateAndEditTaskSet'
import { fetchTestTaskList } from 'entities/Admin/TestTask'
import { fetchProgTaskList } from 'entities/Admin/ProgTask'
import plusImg from 'shared/assets/icon/plusWhite2.png'
import { loginByUsername } from 'features/auth/by-pass/model/services/loginByUsername/loginByUsername'
import { getUserAuthData } from 'entities/User'
import { useAuthLocalStrorage } from 'shared/lib/hooks/useAuthLocalStrorage/useAuthLocalStrorage'
interface AdminTaskSetsPageProps {
  className?: string
}

export const AdminTaskSetsPage: React.FC<AdminTaskSetsPageProps> = (props) => {
  const { className = '' } = props
  const taskSetsListInit = useSelector(getTaskSets)
  const taskSetsLoader = useSelector((state: StateSchema) => state.taskSets.isLoading)
  const [taskSetsList, setTaskSetsList] = useState<TaskSet[]>([])
  const userAuthData = useSelector(getUserAuthData)
  const [createAndEdit, setCreateAndEdit] = useState<{
    status: cardEditStatus
    editCard: TaskSet | null
  }>({ status: cardEditStatus.CLOSE, editCard: null })
  const [checkAuthLocalStorage, clearAuthData] = useAuthLocalStrorage()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    checkAuthLocalStorage()

    dispatch(fetchTestTaskList({}))
    dispatch(fetchProgTaskList({}))
  }, [])

  const onLogin = useCallback(async (username: string, password: string) => {
    const result = await dispatch(loginByUsername({ username, password }))
  }, [])

  useEffect(() => {
    if (taskSetsListInit.length === 0) {
      dispatch(fetchTaskSetsData({}))
    } else {
      setTaskSetsList(taskSetsListInit)
    }
  }, [taskSetsListInit])

  const setTaskSets = async () => {
    const response = await fetch('api/get/task_set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    const taskSets: TaskSet[] = await response.json()
    setTaskSetsList(taskSets)
  }

  const startEditTaskSet = (taskSet: TaskSet) => {
    setCreateAndEdit({ status: cardEditStatus.EDIT, editCard: taskSet })
  }
  const startCreateTaskSet = () => {
    setCreateAndEdit({ status: cardEditStatus.CREATE, editCard: null })
  }
  const finishEditTaskSet = () => {
    setTaskSets()
    setCreateAndEdit({ status: cardEditStatus.CLOSE, editCard: null })
  }

  const taskSetsListMemo = useMemo(() => {
    return taskSetsList.map((taskSet) => (
      <TaskSetCard
        key={taskSet.id}
        className={cls.taskSet}
        taskSet={taskSet}
        startEdit={startEditTaskSet}
        afterDelete={setTaskSets}
      />
    ))
  }, [taskSetsList])

  return (
    <div className={classNames(cls.adminTaskSetsPage, {}, [className])}>
      <div className={cls.headerTab}>
        <SearchField value="" onChange={(text) => console.log(text)}></SearchField>
        <Button className={cls.addTaskSets} size={SizeButton.L} onClick={startCreateTaskSet} style={{ gap: 5 }}>
          Добавить набор заданий
          <img src={plusImg} className={cls.plus} alt="plus" />
        </Button>
      </div>
      <div className={cls.vacancies}>
        {taskSetsLoader && <Loader></Loader>}
        {taskSetsListMemo}
        {createAndEdit.status !== cardEditStatus.CLOSE && (
          <CreateAndEditTaskSet taskSet={createAndEdit.editCard} finishEditTaskSet={finishEditTaskSet} />
        )}
      </div>
    </div>
  )
}
