import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './VacancyForm.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { MySelect } from 'shared/ui/Select/Select'
import { useDispatch, useSelector } from 'react-redux'
import { Vacancy, vacanciesActions } from 'entities/Admin/Vacancies'
import { Button, ColorButton, SizeButton } from 'shared/ui/Button/Button'
import { sendVacancyData } from 'features/CreateAndEditVacancy/model/service/sendVacancyData/sendVacancyData'
import { TaskSet } from 'entities/Candidate/TestTask'
import { getTaskSets } from 'entities/Admin/TaskSets'

interface VacancyFormProps {
  className?: string
  vacancy: Vacancy | null
  closeModal: () => void
}

export const VacancyForm: React.FC<VacancyFormProps> = (props) => {
  const { className = '', vacancy, closeModal } = props
  const taskSets = useSelector(getTaskSets)
  const [selectedTaskSets, setSelectedTaskSets] = useState<string[]>(
    vacancy ? vacancy.taskSets.map((ts: TaskSet) => ts.name) : []
  )
  const [vacancyName, setVacancyName] = useState<string>(vacancy?.name || '')
  const dispatch = useDispatch()

  const changeState = (newValue: string) => {
    setVacancyName(newValue)
  }

  const validateValue = () => {
    return vacancyName !== '' && selectedTaskSets.length > 0
  }

  const checkAndSendData = async () => {
    const validate = validateValue()
    if (!validate) {
      return
    }
    let newVacancy: Vacancy
    const tasksSetIds: TaskSet[] = []
    selectedTaskSets.forEach((name) => {
      const findTaskSet = taskSets.find((taskSet) => taskSet.name === name)
      if (findTaskSet) {
        tasksSetIds.push(findTaskSet)
      } else {
        console.log('Тасксет с именем ', name, ' не найден')
      }
    })
    if (vacancy) {
      newVacancy = { ...vacancy, name: vacancyName, taskSets: tasksSetIds }
      const answer = await sendVacancyData(newVacancy)
      if (answer === 'OK') {
        dispatch(vacanciesActions.setUpdateVacancy(newVacancy))
      }
      closeModal()
    } else {
      newVacancy = {
        id: 99,
        name: vacancyName,
        taskSets: tasksSetIds,
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
      <Input placeholder="Название вакансии" value={vacancyName} onChange={changeState} className={cls.input} />
      <div className={cls.vacancies}>
        <span className={cls.vacansiesTitle}> Тестовые наборы</span>
        <MySelect
          isMulti={true}
          className={cls.vacanciesSelect}
          placeHolder="Выбрать тестовые наборы"
          changeSelect={(el) => Array.isArray(el) && setSelectedTaskSets(el)}
          selected={selectedTaskSets.map((taskSetName) => ({
            value: taskSetName,
            label: taskSetName
          }))}
          options={taskSets.map((taskSet) => {
            return {
              label: taskSet.name,
              value: taskSet.name
            }
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
