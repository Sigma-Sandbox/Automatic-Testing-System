import React, { useEffect, useState } from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './OneTask.module.scss'
import {ProgTask, TestTask} from 'entities/Candidate/TestTask'

interface OneTaskProps {
  className?: string
  task: TestTask | ProgTask
  select?: boolean | null
  changeTaskSelect: (elem: ProgTask | TestTask, index: number) => void
  index: number
  handleBorder: (select: TestTask | ProgTask) => void
}

export const OneTask: React.FC<OneTaskProps> = (props) => {
  const {className = '', select = false, task, changeTaskSelect, index, handleBorder} = props

  if ('questions' in task)
    return (
      <div
        className={classNames(cls.oneTask, {[cls.select]: select ? true : false}, [className])}
        onClick={() => {
          changeTaskSelect(task, index)
          handleBorder(task)
        }}
      >
        <div className={cls.side}>
          <div className={cls.name}>{task.name}</div>

          <div className={cls.descipt}>{task.description}</div>
          <div className={cls.descipt}>Ограничение по времени: {task.execTime}</div>
        </div>

        <div className={cls.sideQuest}>
          <div className={cls.name}>Вопросы</div>
          <div className={cls.questions}>
            {task.questions.map((el) => {
              if (el) {
                return <div className={cls.question}>{el.description}</div>
              } else {
                return ''
              }
            })}
          </div>
        </div>
      </div>
    )
  return (
    <div className={classNames(cls.oneTask, {[cls.select]: select ? true : false}, [className])}
         onClick={() => {
           changeTaskSelect(task, index)
           handleBorder(task)
         }}
    >
      <div className={cls.side}>
        <div className={cls.name}>{task.name}</div>
        <div className={cls.descipt}>Сложность: {task.complexityAssessment}</div>
        <div className={cls.descipt}>Языки программирования: {task.conditions.map(c => c.language).join(', ')}</div>
      </div>

      <div className={cls.sideQuest}>
        <div className={cls.name}> Задание</div>
        <div className={cls.descipt}> {task.description}</div>
      </div>
    </div>
  )
}
