import React, { useEffect, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './MainEditTaskSet.module.scss'
import { NavbarEditTaskSet } from '../NavbarEditTaskSet/NavbarEditTaskSet'
import { ProgTask, TaskSet, TestTask } from 'entities/Candidate/TestTask'
import { StartEdit } from '../StartEdit/StartEdit'
import { useSelector } from 'react-redux'
import { EditTaskSlide } from '../EditTaskSlide/EditTaskSlide'
import { Button, SizeButton } from 'shared/ui/Button/Button'
import { ProgrammingLanguage } from 'core/enums'
import { getAllProgTask } from 'entities/Admin/ProgTask'
import { getAllTestTask } from 'entities/Admin/TestTask'

interface MainEditTaskSetProps {
  className?: string
  taskSet: TaskSet | null
  closeModal: () => void
}

export interface CommonTask {
  name: string
  time: number
  languages: ProgrammingLanguage[]
  description: string
}

export type TypeTaskInEdit = ProgTask | TestTask | null | CommonTask

export const MainEditTaskSet: React.FC<MainEditTaskSetProps> = (props) => {
  const {className = '', taskSet, closeModal} = props
  const [currentTask, setCurrentTask] = useState<number>(1)
  const [isEditableCard, setIsEditableCard] = useState<boolean>(true)
  const progTaskListInit = useSelector(getAllProgTask)
  const testTaskListInit = useSelector(getAllTestTask)

  const [createdTask, setCreatedTask] = useState<TypeTaskInEdit[]>(
      taskSet ?
      [{name: taskSet.name, time: taskSet.timeLimits, languages: taskSet.language, description: taskSet.description}, ...taskSet.progTasks, ...taskSet.testTasks] :
      [{name: '', time: 0, languages: [], description: ''}]
  )

  const validateAddTask = () => {
    return true
  }

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

  const changeCurrentTask = (newValue?: number, next?: boolean) => {
    if (newValue) {
      setCurrentTask(newValue)
    } else {
      if (!isEditableCard || next) setCurrentTask(createdTask.length + 1)
    }
  }

  const taskSetList = useMemo(() => {
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
    setCreatedTask(newCreated)
    if (createdTask[createdTask.length - 1] !== null) {
      setIsEditableCard(false)
    }
  }

  const handleDeleteTask = (index: number) => {
    const newCreated: TypeTaskInEdit[] = []
    createdTask.forEach((task, i) => {
      if (i < index) {
        newCreated[i] = task
      } else if (i > index) {
        newCreated[i - 1] = task
      }
    })
    setCreatedTask(newCreated)
  }

  const handleNext = (commonTask: CommonTask) => {
    changeCurrentTask(createdTask.length > 1 ? 2 : undefined, true)
    const newCreatedTask = createdTask
    newCreatedTask[0] = commonTask
    setCreatedTask(newCreatedTask)
  }

  const renderTaskList = useMemo(() => {
    return createdTask.map((el, i) => {
      if (i + 1 === 1 && el && 'time' in el) {
        return <StartEdit data={el} next={handleNext}></StartEdit>
      } else {
        return (
          <EditTaskSlide
            task={el}
            changeTaskSelect={changeTaskSelect}
            progTaskListInit={progTaskListInit}
            testTaskListInit={testTaskListInit}
            index={i}
            handleDeleteTask={handleDeleteTask}
          ></EditTaskSlide>
        )
      }
    })
  }, [createdTask, createdTask.length])

  const editTask2TaskSet = (): TaskSet => {
    const progTasks: ProgTask[] = []
    const testTasks: TestTask[] = []

    createdTask.forEach(task => {
      if (task && 'complexityAssessment' in task) {
        progTasks.push(task)
      } else if (task && 'questions' in task) {
        testTasks.push(task)
      }
    })

    if (taskSet !== null) {
      return {
        ...taskSet,
        description: (createdTask[0]! as CommonTask).description,
        name: (createdTask[0]! as CommonTask).name,
        progTasks: progTasks,
        testTasks: testTasks,
        language: (createdTask[0]! as CommonTask).languages,
        timeLimits: (createdTask[0]! as CommonTask).time
      }
    } else {
      return {
        name: (createdTask[0]! as CommonTask).name,
        description: (createdTask[0]! as CommonTask).description,
        progTasks: progTasks,
        testTasks: testTasks,
        creator: 'Кто-то',   // FIXME: откуда достать создателя?
        language: (createdTask[0]! as CommonTask).languages,
        timeLimits: (createdTask[0]! as CommonTask).time,
        timeOfCreation: Date.now()
      }
    }
  }

  const handleSaveEdit = async () => {
    const ts = editTask2TaskSet()
    if (taskSet !== null) {
      const response = await fetch('api/update', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ts),
      })
      if (response.status === 200) {
        closeModal()
      } else {
        console.log('Не удалось обновить Task Set')
      }
    } else {
      const response = await fetch('api/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ts),
      })
      if (response.status === 200) {
        closeModal()
      } else {
        console.log('Не удалось добавить Task Set')
      }
    }
  }

  return (
    <div className={classNames(cls.mainEditTaskSet, {}, [className])}>
      <NavbarEditTaskSet
        changeCurrentTask={changeCurrentTask}
        totalTask={createdTask}
        currentTask={currentTask}
        isEditableCard={isEditableCard}
        saveEdit={handleSaveEdit}
      ></NavbarEditTaskSet>
      <div style={{marginTop: 30}}>
        <Button size={SizeButton.XL} onClick={closeModal}>
          {'Вернуться в меню Task Set'}
        </Button>
      </div>
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
