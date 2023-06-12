import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './NavbarEditTaskSet.module.scss'
import { Button, ColorButton, SizeButton } from 'shared/ui/Button/Button'
import { TypeTaskInEdit } from '../MainEditTaskSet/MainEditTaskSet'

interface NavbarEditTaskSetProps {
  className?: string
  changeCurrentTask: (value?: number) => void
  totalTask: TypeTaskInEdit[]
  currentTask: number
  isEditableCard: boolean
  saveEdit: () => void
}

export const NavbarEditTaskSet: React.FC<NavbarEditTaskSetProps> = (props) => {
  const {className = '', changeCurrentTask, totalTask, currentTask, isEditableCard, saveEdit} = props

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
        className={classNames(cls.btn, {[cls.disable]: isEditableCard || totalTask.length === 1})}
        color={ColorButton.PRIMARY_COLOR}
        onClick={() => changeCurrentTask()}
      >
        +
      </Button>
      <div style={{ position: 'absolute', right: 40 }}>
        <Button onClick={saveEdit} color={ColorButton.SECONDARY_COLOR} size={SizeButton.XL}>
          Сохранить и выйти
        </Button>
      </div>
    </div>
  )
}
