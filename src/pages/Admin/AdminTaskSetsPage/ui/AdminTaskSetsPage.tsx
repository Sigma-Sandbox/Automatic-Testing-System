import React, { useEffect, useMemo, useState } from 'react'
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

interface AdminTaskSetsPageProps {
  className?: string
}

export const AdminTaskSetsPage: React.FC<AdminTaskSetsPageProps> = (props) => {
  const { className = '' } = props
  const taskSetsListInit = useSelector(getTaskSets)
  const taskSetsLoader = useSelector((state: StateSchema) => state.taskSets.isLoading)
  const [taskSetsList, setTaskSetsList] = useState<TaskSet[]>([])
  const [createAndEdit, setCreateAndEdit] = useState<{
    status: cardEditStatus
    editCard: TaskSet | null
  }>({ status: cardEditStatus.CLOSE, editCard: null })

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchTestTaskList({}))
    dispatch(fetchProgTaskList({}))
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
      headers: {'Content-Type': 'application/json'}
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
      <TaskSetCard key={taskSet.id} className={cls.taskSet} taskSet={taskSet} startEdit={startEditTaskSet} afterDelete={setTaskSets} />
    ))
  }, [taskSetsList])

  return (
    <div className={classNames(cls.adminTaskSetsPage, {}, [className])}>
      <div className={cls.headerTab}>
        <SearchField value="" onChange={(text) => console.log(text)}></SearchField>
        <Button size={SizeButton.L} onClick={startCreateTaskSet}>
          Добавить набор заданий
        </Button>
      </div>
      <div className={cls.vacancies}>
        {taskSetsLoader && <Loader></Loader>}
        {taskSetsListMemo}
        {createAndEdit.status !== cardEditStatus.CLOSE && (
          <CreateAndEditTaskSet
            taskSet={createAndEdit.editCard}
            finishEditTaskSet={finishEditTaskSet}
          />
        )}
      </div>
    </div>
  )
}
