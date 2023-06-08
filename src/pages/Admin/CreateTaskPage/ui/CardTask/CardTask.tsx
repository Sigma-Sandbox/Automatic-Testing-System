import React, { useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CardTask.module.scss'
import { ProgTask, TestTask } from 'entities/Candidate/TestTask'

interface cardTaskProps {
  className?: string
  task: ProgTask | TestTask
}

export const CardTask: React.FC<cardTaskProps> = (props) => {
  const { className = '', task } = props

  const [condType, setCondType] = useState(0)

  useEffect(() => {
    if ('conditions' in task) {
      console.log(task.conditions)
    } else {
      console.log(task.questions)
    }
  }, [])

  if ('conditions' in task) {
    return (
      <div className={classNames(cls.cardTask, {}, [className])}>
        <div className={classNames(cls.name)}>{task.name}</div>
        <div className={classNames(cls.description)}>{task.description}</div>
        <span className={classNames(cls.typeCard)}>{task.conditions.map((el) => el.language).join(' | ')}</span>

        <div className={classNames(cls.conds)}>
          <div className={classNames(cls.condName)}>
            Ограничения:{' '}
            {task.conditions.map((cond, index) => (
              <span
                className={classNames(cls.condBtn, { [cls.select]: index === condType })}
                onClick={() => setCondType(index)}
              >
                {cond.language}
              </span>
            ))}
          </div>
          <div className={classNames(cls.condList)}>
            {task.conditions.map((el, index) => (
              <div className={classNames(cls.cond)} style={{ transform: `translateY(-${condType * 100}%)` }}>
                время: {el.maxTime} мс | память: {el.maxMemory} мб
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={classNames(cls.cardTask, {}, [className])}>
      <div className={classNames(cls.name)}>{task.name}</div>

      <div className={classNames(cls.questions)}>
        {task.questions.map((el, index) => (
          <div className={classNames(cls.question)}>
            {index + 1}.
            {
              // @ts-ignore-start
              el[0]?.description
            }
          </div>
        ))}
      </div>
    </div>
  )
}
