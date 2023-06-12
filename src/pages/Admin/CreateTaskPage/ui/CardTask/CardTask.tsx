import React, { useCallback, useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CardTask.module.scss'
import { ProgTask, TestTask } from 'entities/Candidate/TestTask'
import { Button, ColorButton, ThemeButton } from 'shared/ui/Button/Button'
import editSvg from 'shared/assets/icon/edit_main_card.svg'
import trashSvg from 'shared/assets/icon/trash.svg'

interface cardTaskProps {
  className?: string
  task: ProgTask | TestTask
  editTask: (task: ProgTask | TestTask) => void
}

export const CardTask: React.FC<cardTaskProps> = (props) => {
  const { className = '', task, editTask } = props

  const [condType, setCondType] = useState(0)

  const startEditTask = useCallback(() => {
    editTask(task)
  }, [editTask])

  if ('conditions' in task) {
    return (
      <div className={classNames(cls.cardTask, {}, [className])}>
        <div className={cls.cardSet}>
          <Button
            onClick={startEditTask}
            theme={ThemeButton.CLEAR}
            color={ColorButton.TRANSPARENT}
            className={cls.editCard}
          >
            <img src={editSvg} alt="edit card" />
          </Button>
          <Button
            onClick={startEditTask}
            theme={ThemeButton.CLEAR}
            color={ColorButton.TRANSPARENT}
            className={cls.trashCard}
          >
            <img src={trashSvg} alt="delete" />
          </Button>
        </div>
        <div className={classNames(cls.name)}>{task.name}</div>
        <div className={classNames(cls.description, {}, ['custom_scroll'])}>{task.description}</div>
        <span className={classNames(cls.typeCard)}>{task.conditions.map((el) => el.language).join(' | ')}</span>

        <div className={classNames(cls.conds)}>
          <div className={classNames(cls.condName, {}, ['custom_scroll'])}>
            Ограничения:{' '}
            {task.conditions.map((cond, index) => (
              <span
                className={classNames(cls.condBtn, { [cls.select]: index === condType })}
                onClick={() => setCondType(index)}
                key={index}
              >
                {cond.language}
              </span>
            ))}
          </div>
          <div className={classNames(cls.condList)}>
            {task.conditions.map((el, index) => (
              <div
                key={index}
                className={classNames(cls.cond)}
                style={{ transform: `translateY(-${condType * 100}%)` }}
              >
                время: <span className={classNames('', {}, ['bold'])}> {el.maxTime} мс</span> | память:{' '}
                <span className={classNames('', {}, ['bold'])}> {el.maxMemory} мб</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={classNames(cls.cardTask, {}, [className])}>
      <div className={cls.cardSet}>
        <Button
          onClick={startEditTask}
          theme={ThemeButton.CLEAR}
          color={ColorButton.TRANSPARENT}
          className={cls.editCard}
        >
          <img src={editSvg} alt="edit card" />
        </Button>
        <Button
          onClick={startEditTask}
          theme={ThemeButton.CLEAR}
          color={ColorButton.TRANSPARENT}
          className={cls.trashCard}
        >
          <img src={trashSvg} alt="delete" />
        </Button>
      </div>
      <div className={classNames(cls.name)}>{task.name}</div>
      <div className={classNames(cls.cardMain)}>
        <div className={classNames(cls.questions, {}, ['custom_scroll'])}>
          {task.questions.map((el, index) => (
            <div key={el.id} className={classNames(cls.question)}>
              {index + 1}.{el.description}
            </div>
          ))}
        </div>
        <div className={classNames(cls.info)}>
          <div className={classNames(cls.testCond)}>
            Время: <span className={classNames('', {}, ['bold'])}>{task.execTime} сек</span>
          </div>
        </div>
      </div>
    </div>
  )
}
