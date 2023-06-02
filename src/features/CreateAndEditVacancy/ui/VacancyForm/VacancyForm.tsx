import React, {useEffect, useMemo, useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './VacancyForm.module.scss'
import {Input} from 'shared/ui/Input/Input'
import {MySelect} from 'shared/ui/Select/Select'
import {useDispatch, useSelector} from 'react-redux'
import {Vacancy, vacanciesActions} from 'entities/Admin/Vacancies'
import {Button, ColorButton, SizeButton} from 'shared/ui/Button/Button'
import {sendVacancyData} from 'features/CreateAndEditVacancy/model/service/sendVacancyData/sendVacancyData'
import {StateSchema} from 'app/providers/StoreProvider'
interface VacancyFormProps {
  className?: string
  vacancy: Vacancy | null
  closeModal: () => void
}

export const VacancyForm: React.FC<VacancyFormProps> = (props) => {
  const {className = '', vacancy, closeModal} = props
  const taskSets = useSelector((state: StateSchema) => state.taskSets.data)
  const dispatch = useDispatch()
  const [selectedTaskSetIds, setSelectedTaskSetIds] = useState<string[]>(
    vacancy
      ? vacancy?.taskSetIds.map((id) => taskSets.find((el) => el.id === id)?.name || 'not name')
      : []
  )
  const [vacancyName, setVacancyName] = useState<string>(vacancy?.name || '')

  const changeState = (newValue: string) => {
    setVacancyName(newValue)
  }

  const validateValue = () => {
    // TODO
  }
  const checkAndSendData = async () => {
    validateValue()
    let newVacancy: Vacancy
    if (vacancy) {
      newVacancy = {...vacancy, name: vacancyName, taskSetIds: selectedTaskSetIds.map((el) => +el)}
      const answer = await sendVacancyData(newVacancy)
      if (answer === 'OK') {
        dispatch(vacanciesActions.setUpdateVacancy(newVacancy))
      }
      closeModal()
    } else {
      newVacancy = {
        id: 99,
        name: vacancyName,
        taskSetIds: selectedTaskSetIds.map((el) => +el),
      }
      const answer = await sendVacancyData(newVacancy, true)
      if (answer === 'OK') {
        dispatch(vacanciesActions.setAddVacancy(newVacancy))
      }
      closeModal()
    }
  }

  return (
    <div className={classNames(cls.cardForm, {}, [className])}>
      <div className={cls.title}>Вакансия</div>
      <Input
        placeholder='Название вакансии'
        value={vacancyName}
        onChange={changeState}
        className={cls.input}
      />
      <div className={cls.vacancies}>
        <span className={cls.vacansiesTitle}> Тестовые наборы</span>
        <MySelect
          isMulti={true}
          className={cls.vacanciesSelect}
          placeHolder='Выбрать тестовые наборы'
          changeSelect={(el) => Array.isArray(el) && setSelectedTaskSetIds(el)}
          selected={selectedTaskSetIds.map((taskSetId) => ({value: taskSetId, label: taskSetId}))}
          options={taskSets.map((taskSet) => {
            return {label: taskSet.name, value: taskSet.name}
          })}
        ></MySelect>
      </div>
      <Button
        onClick={checkAndSendData}
        color={ColorButton.SECONDARY_COLOR}
        size={SizeButton.XL}
        className={cls.btnSave}
      >
        Сохранить
      </Button>
    </div>
  )
}
