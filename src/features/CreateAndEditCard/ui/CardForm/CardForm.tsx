import React, { useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CardForm.module.scss'
import { MySelect } from 'shared/ui/Select/Select'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ColorButton, SizeButton, ThemeButton } from 'shared/ui/Button/Button'
import CopySvg from 'shared/assets/icon/copy.svg'
import { ResultVacancyTest, User } from 'entities/User'
import { PersonInputs } from './PersonInputs'
import { sendUsersData } from 'features/CreateAndEditCard/model/service/sendUserData/sendUsersData'
import { usersDataActions } from 'entities/Admin/Users'
import { ProgrammingLanguage, UserRole, Vacancy } from 'core/enums'
import { TaskSet } from 'entities/Candidate/TestTask'
import { getVacancies } from 'entities/Admin/Vacancies/model/selectors/getVacancies/getVacancies'

interface CardFormProps {
  className?: string
  link?: string
  user: User | null
  closeModal: () => void
}

export type PersonState = {
  surname: string
  name: string
  patronymic?: string
  email: string
}
export const CardForm: React.FC<CardFormProps> = (props) => {
  const { className = '', link = 'blabla', user, closeModal } = props
  const allVacancies = useSelector(getVacancies)
  const dispatch = useDispatch()
  const [selectedVacancies, setSelectedVacancies] = useState<string[]>(
    user ? user.vacancies.map((vacancy) => vacancy.vacancyName) : []
  )
  const [personState, setPersonState] = useState<PersonState>({
    surname: user?.surname || '',
    name: user?.name || '',
    patronymic: user?.patronymic || '',
    email: user?.email || '',
  })
  useEffect(() => {
    console.log(selectedVacancies, user?.vacancies)
  }, [])
  const copyLink = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log('Ссылка скопирована')
      })
      .catch((err) => {
        console.log('Не удалось скопировать', err)
      })
  }
  const changeState = (newValue: string, typeValue: string) => {
    switch (typeValue) {
      case 'surname':
        setPersonState((prevState) => ({ ...prevState, surname: newValue }))
        break
      case 'name':
        setPersonState((prevState) => ({ ...prevState, name: newValue }))
        break
      case 'patronymic':
        setPersonState((prevState) => ({ ...prevState, patronymic: newValue }))
        break
      case 'email':
        setPersonState((prevState) => ({ ...prevState, email: newValue }))
        break
    }
  }

  const validateValue = () => {
    // TODO
  }
  const checkAndSendData = async () => {
    validateValue()
    let option: User
    const vacanciesUser: ResultVacancyTest[] = []
    selectedVacancies.forEach((vacancyName) => {
      const vacancyId = allVacancies.find((vac) => vac.name === vacancyName)
      if (vacancyId) {
        const userSolutions = user?.vacancies.find((vac) => vac.vacancyId === vacancyId.id)?.userSolutions || []
        vacanciesUser.push({ vacancyId: vacancyId.id, vacancyName, userSolutions })
      } else {
        console.log('вакансия с именем ', vacancyName, ' не найдена')
      }
    })
    if (user) {
      option = { ...user, ...personState, vacancies: vacanciesUser }
      const answer = await sendUsersData(option)
      if (answer === 'OK') {
        dispatch(usersDataActions.setUpdateUsers(option))
      }
      closeModal()
    } else {
      option = {
        ...personState,
        id: -100,
        accessRights: UserRole.APPLICANT,
        actualLink: 'blablabalbal',
        startLinkTimestamp: '2023-04-30T21:00:00.000Z',
        endLinkTimestamp: '2023-04-30T21:00:00.000Z',
        vacancies: vacanciesUser,
      }
      const answer = await sendUsersData(option, true)
      if (answer === 'OK') {
        dispatch(usersDataActions.setAddUser(option))
      }
      closeModal()
    }
  }

  return (
    <div className={classNames(cls.cardForm, {}, [className])}>
      <div className={cls.title}>Новая карточка соискателя</div>
      <div className={cls.person}>
        <PersonInputs personState={personState} changeState={changeState} />
        <div className={cls.vacancies}>
          <span className={cls.vacansiesTitle}> Вакансии соискателя</span>
          <MySelect
            isMulti={true}
            className={cls.vacanciesSelect}
            placeHolder="Выберите вакансию"
            changeSelect={(el) => Array.isArray(el) && setSelectedVacancies(el)}
            selected={selectedVacancies.map((vacancy) => ({
              value: vacancy,
              label: vacancy,
            }))}
            options={allVacancies.map((vacancy) => {
              return { label: vacancy.name, value: vacancy.name }
            })}
          ></MySelect>
        </div>
      </div>
      {user?.actualLink && (
        <div className={cls.link}>
          <span>{user?.actualLink}</span>{' '}
          <Button theme={ThemeButton.CLEAR} className={cls.copyBtn} onClick={copyLink}>
            <img src={CopySvg} alt="copy" />
          </Button>
        </div>
      )}
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
