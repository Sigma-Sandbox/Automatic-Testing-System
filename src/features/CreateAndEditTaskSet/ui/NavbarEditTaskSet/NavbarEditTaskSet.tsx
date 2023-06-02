import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './NavbarEditTaskSet.module.scss'
import {Button, ColorButton, ThemeButton} from 'shared/ui/Button/Button'
import {typeTaskInEdit} from '../MainEditTaskSet/MainEditTaskSet'

interface NavbarEditTaskSetProps {
  className?: string
  changeCurrentTask: (value?: number) => void
  totalTask: typeTaskInEdit[]
  currentTask: number
  isEditableCard: boolean
}

export const NavbarEditTaskSet: React.FC<NavbarEditTaskSetProps> = (props) => {
  const {className = '', changeCurrentTask, totalTask, currentTask, isEditableCard} = props

  return (
    <div className={classNames(cls.navbarEditTaskSet, {}, [className])}>
      {totalTask.map((el, i) => (
        <div
          className={classNames(cls.item, {
            [cls.select]: i + 1 === currentTask,
            [cls.editable]: el === null,
          })}
          onClick={() => changeCurrentTask(i + 1)}
          key={i}
        >
          {i}
        </div>
      ))}
      <Button
        className={classNames(cls.btn, {[cls.disable]: isEditableCard})}
        color={ColorButton.PRIMARY_COLOR}
        onClick={() => changeCurrentTask()}
      >
        +
      </Button>
    </div>
  )
}
