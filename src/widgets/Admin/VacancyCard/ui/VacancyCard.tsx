import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './VacancyCard.module.scss'
import {Vacancy} from 'entities/Admin/Vacancies'
import {Button, ThemeButton} from 'shared/ui/Button/Button'
import TrashSvg from 'shared/assets/icon/trash.svg'
import EditVacSvg from 'shared/assets/icon/editVacan.svg'

interface VacancyCardProps {
  className?: string
  vacancy: Vacancy
  deleteVacancy?: (id: number) => void
  startEdit?: (vacancy: Vacancy) => void
}

export const VacancyCard: React.FC<VacancyCardProps> = (props) => {
  const {className = '', vacancy, deleteVacancy, startEdit} = props

  const editCard = () => {
    startEdit && startEdit(vacancy)
  }
  const deleteCard = () => {
    deleteVacancy && deleteVacancy(vacancy.id)
  }

  return (
    <div className={classNames(cls.vacancyCard, {}, [className])}>
      <span className={classNames(cls.name)}> {vacancy.name}</span>

      <div className={classNames(cls.btns)}>
        <Button
          theme={ThemeButton.CLEAR}
          className={classNames(cls.btn, {}, [cls.editBtn])}
          onClick={editCard}
        >
          <img src={EditVacSvg} alt='edit vacancy' />
        </Button>
        <Button
          theme={ThemeButton.CLEAR}
          className={classNames(cls.btn, {}, [cls.delBtn])}
          onClick={deleteCard}
        >
          <img src={TrashSvg} alt='delete vacancy' />
        </Button>
      </div>
    </div>
  )
}
