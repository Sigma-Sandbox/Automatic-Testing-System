import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './TaskSetCard.module.scss'
import {Vacancy} from 'entities/Admin/Vacancies'
import {Button, ColorButton, ThemeButton} from 'shared/ui/Button/Button'
import TrashSvg from 'shared/assets/icon/trash.svg'
import EditVacSvg from 'shared/assets/icon/editVacan.svg'
import {TaskSet} from 'entities/Candidate/TestTask'

interface TaskSetCardProps {
  className?: string
  taskSet: TaskSet
  deleteVacancy?: (id: number) => void
  startEdit?: (taskSet: TaskSet) => void
}

export const TaskSetCard: React.FC<TaskSetCardProps> = (props) => {
  const {className = '', taskSet, deleteVacancy, startEdit} = props

  const editCard = () => {
    startEdit && startEdit(taskSet)
  }
  const deleteCard = () => {
    deleteVacancy && deleteVacancy(taskSet.id || 99)
  }

  return (
    <div className={classNames(cls.taskSetCard, {}, [className])}>
      <span className={classNames(cls.name)}> {taskSet.name}</span>

      <div className={classNames(cls.btns)}>
        <Button
          theme={ThemeButton.CLEAR}
          color={ColorButton.TRANSPARENT}
          className={classNames(cls.btn, {}, [cls.editBtn])}
          onClick={editCard}
        >
          <img src={EditVacSvg} alt='edit taskSet' />
        </Button>
        <Button
          theme={ThemeButton.CLEAR}
          color={ColorButton.TRANSPARENT}
          className={classNames(cls.btn, {}, [cls.delBtn])}
          onClick={deleteCard}
        >
          <img src={TrashSvg} alt='delete taskSet' />
        </Button>
      </div>
    </div>
  )
}
