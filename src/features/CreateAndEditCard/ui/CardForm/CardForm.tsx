import React, { useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CardForm.module.scss'
import { MySelect } from 'shared/ui/Select/Select'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ColorButton, SizeButton, ThemeButton } from 'shared/ui/Button/Button'
import CopySvg from 'shared/assets/icon/copy.svg'
import PlusSvg from 'shared/assets/icon/plus.svg'
import { ResultVacancyTest, User } from 'entities/User'
import { PersonInputs } from './PersonInputs'
import { sendUsersData } from 'features/CreateAndEditCard/model/service/sendUserData/sendUsersData'
import { usersDataActions } from 'entities/Admin/Users'
import { UserRole } from 'core/enums'
import { getVacancies } from 'entities/Admin/Vacancies/model/selectors/getVacancies/getVacancies'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface CardFormProps {
  className?: string
  user: User | null
  closeModal: () => void
}

export type PersonState = {
  surname: string
  name: string
  patronymic?: string
  email: string
  actualLink: string
}
export const CardForm: React.FC<CardFormProps> = (props) => {
  const { className = '', user, closeModal } = props
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
    actualLink: user?.actualLink || '',
  })

  const notify = (text: string) => toast(text)
  const copyLink = () => {
    navigator.clipboard
      .writeText(personState.actualLink)
      .then(() => {
        console.log('Ссылка скопирована')
        notify('Ссылка скопирована')
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

  const generateActualLink = async (id?: number) => {
    if (id) {
      const newLink = await fetch('api/update_user_link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id }),
      })
      const actualLink = await newLink.json()
      setPersonState({ ...personState, actualLink: actualLink.actualLink })
      await navigator.clipboard.writeText(actualLink.actualLink)
    }
  }

  const validateValue = () => {
    return (
      personState.name !== '' && personState.surname !== '' && personState.email !== '' && selectedVacancies.length > 0
    )
  }

  const checkAndSendData = async () => {
    const validate = validateValue()
    if (!validate) {
      return
    }

    let option: User
    const vacanciesUser: ResultVacancyTest[] = []
    selectedVacancies.forEach((vacancyName) => {
      const vacancyId = allVacancies.find((vac) => vac.name === vacancyName)
      if (vacancyId) {
        // TODO: Обнуление попыток, странные дела
        const userSolutions = user?.vacancies.find((vac) => vac.vacancyId === vacancyId.id)?.userSolutions || []
        vacanciesUser.push({ vacancyId: vacancyId.id, vacancyName, userSolutions, numOfTry: 1 })
      } else {
        console.log('Вакансия с именем ', vacancyName, ' не найдена')
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
            className={classNames(cls.vacanciesSelect, {})}
            customScroll={true}
            placeHolder="Выберите вакансию"
            changeSelect={(el) => Array.isArray(el) && setSelectedVacancies(el)}
            controStyle={{ maxHeight: '120px' }}
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

      <div className={cls.link}>
        <span>{personState.actualLink}</span>{' '}
        <div style={{ display: 'inline-flex', gap: 5 }}>
          <Button
            color={ColorButton.TRANSPARENT}
            theme={ThemeButton.CLEAR}
            className={cls.copyBtn}
            onClick={() => generateActualLink(user?.id)}
          >
            <img src={PlusSvg} alt="copy" />
          </Button>
          <Button color={ColorButton.TRANSPARENT} theme={ThemeButton.CLEAR} className={cls.copyBtn} onClick={copyLink}>
            <img src={CopySvg} alt="copy" />
          </Button>
        </div>
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
