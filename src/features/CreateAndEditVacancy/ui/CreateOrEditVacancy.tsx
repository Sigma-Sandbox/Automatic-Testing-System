import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './CreateOrEditCard.module.scss'
import {Modal} from 'shared/ui/Modal/Modal'
import {VacancyForm} from './VacancyForm/VacancyForm'
import {Vacancy} from 'entities/Admin/Vacancies'

interface CreateOrEditVacancyProps {
  className?: string
  vacancy: Vacancy | null
  finishEditVacancy: () => void
}

export const CreateOrEditVacancy: React.FC<CreateOrEditVacancyProps> = (props) => {
  const {className = '', vacancy, finishEditVacancy} = props

  return (
    <Modal closeModal={finishEditVacancy}>
      <VacancyForm vacancy={vacancy} closeModal={finishEditVacancy}></VacancyForm>
    </Modal>
  )
}
