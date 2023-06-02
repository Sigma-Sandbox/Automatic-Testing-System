import React, {useEffect, useMemo, useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './MainEditTaskSet.module.scss'
import {NavbarEditTaskSet} from '../NavbarEditTaskSet/NavbarEditTaskSet'
import {ProgTask} from 'entities/Candidate/TestTask'
import {TestTask} from 'entities/Candidate/TestTask'
import {StartEdit} from '../StartEdit/StartEdit'
import {useSelector} from 'react-redux'
import {StateSchema} from 'app/providers/StoreProvider'
import {EditTaskSlide} from '../EditTaskSlide/EditTaskSlide'

interface MainEditTaskSetProps {
  className?: string
}
export type typeTaskInEdit = ProgTask | TestTask | null | {name: string; time: string}
export const MainEditTaskSet: React.FC<MainEditTaskSetProps> = (props) => {
  const {className = ''} = props
  const [currentTask, setCurrentTask] = useState<number>(1)
  const [isEditableCard, setIsEditableCard] = useState<boolean>(true)
  const protTaskListInit = useSelector((state: StateSchema) => state.progTasksAdmin.data)
  const testTaskListInit = useSelector((state: StateSchema) => state.testTasksAdmin.data)

  const [createdTask, setCreatedTask] = useState<typeTaskInEdit[]>([{name: '', time: ''}])

  const validateAddTask = () => {
    return true
  }

  useEffect(() => {
    console.log(protTaskListInit, testTaskListInit)
  }, [protTaskListInit, testTaskListInit])

  useEffect(() => {
    const haveEditableCard = createdTask.some((el) => el === null)
    if (!isEditableCard && haveEditableCard) {
      setIsEditableCard(true)
      return
    }
    if (!haveEditableCard && isEditableCard) {
      setIsEditableCard(false)
      return
    }
  }, [createdTask])

  const changeCurrentTask = (newValue?: number) => {
    console.log(newValue, currentTask)

    if (newValue) {
      setCurrentTask(newValue)
    } else {
      if (!isEditableCard) setCurrentTask(createdTask.length + 1)
    }
  }

  const taskSetList = useMemo(() => {
    console.log(createdTask, currentTask)
    if (currentTask > createdTask.length) {
      if (!validateAddTask()) {
        // Notify
        return
      }
      setCreatedTask((prev) => [...prev, null])
    }
  }, [currentTask])

  const changeTaskSelect = (elem: ProgTask | TestTask, index: number) => {
    const newCreated = createdTask
    newCreated[index] = elem
    console.log('chag')
    setCreatedTask(newCreated)
  }

  const renderTaskList = useMemo(() => {
    return createdTask.map((el, i) => {
      if (i + 1 === 1 && el && 'time' in el) {
        return <StartEdit data={el}></StartEdit>
      } else {
        return (
          <EditTaskSlide
            task={el}
            changeTaskSelect={changeTaskSelect}
            progTaskListInit={protTaskListInit}
            testTaskListInit={testTaskListInit}
            index={i}
          ></EditTaskSlide>
        )
      }
    })
  }, [createdTask])
  return (
    <div className={classNames(cls.mainEditTaskSet, {}, [className])}>
      <NavbarEditTaskSet
        changeCurrentTask={changeCurrentTask}
        totalTask={createdTask}
        currentTask={currentTask}
        isEditableCard={isEditableCard}
      ></NavbarEditTaskSet>
      <div className={cls.content}>
        <div
          className={cls.slider}
          style={{
            transform: `translateX(calc(-${currentTask - 1}00% - (${currentTask - 1} * 35px)))`,
          }}
        >
          {renderTaskList}
        </div>
      </div>
    </div>
  )
}
