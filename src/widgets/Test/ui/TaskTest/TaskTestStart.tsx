import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './TaskTest.module.scss'
import {Button, ColorButton, SizeButton} from 'shared/ui/Button/Button'

interface TaskTestStartProps {
  className?: string
  allCountTest: number
  name: string
  time: string
  startTest: () => void
}

export const TaskTestStart: React.FC<TaskTestStartProps> = (props) => {
  const {className = '', allCountTest, name, time, startTest} = props

  return (
    <div className={classNames(cls.taskTestItem, {}, [className, cls.taskTestStart])}>
      <div className={cls.startItem}>{name}</div>
      <div className={cls.startItem}>Количество вопросов: {allCountTest}</div>
      <div className={cls.startItem}>Ограничения по времени: {time}</div>

      <Button color={ColorButton.PRIMARY_COLOR} size={SizeButton.L} onClick={startTest} className={cls.startBtn}>
        Начать тест
      </Button>
    </div>
  )
}
