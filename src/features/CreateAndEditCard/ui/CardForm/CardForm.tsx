import React, {useEffect, useMemo, useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './CardForm.module.scss'
import {Input} from 'shared/ui/Input/Input'
import {MySelect} from 'shared/ui/Select/Select'
import {useDispatch, useSelector} from 'react-redux'
import {getVacanciesName} from 'entities/Admin/Vacancies'
import {Button, ColorButton, SizeButton, ThemeButton} from 'shared/ui/Button/Button'
import CopySvg from 'shared/assets/icon/copy.svg'
import {User, userActions} from 'entities/User'
import axios from 'axios'
import {getUsersPath, updateEntitiePath} from 'shared/const/queryPath'
import {PersonInputs} from './PersonInputs'
import {sendUsersData} from 'features/CreateAndEditCard/model/service/sendUserData/sendUsersData'
import {usersDataActions} from 'entities/Admin/Users'
import {ProgrammingLanguage, UserRole} from 'core/enums'
import {TaskSet} from 'entities/Candidate/TestTask'
interface CardFormProps {
  className?: string
  link?: string
  user: User | null
  closeModal: () => void
}

const taskSetMock: TaskSet = {
  id: 2,
  name: 'name22',
  description: 'description22',
  timeLimits: 123,
  testTasks: [
    {
      id: 2,
      name: 'Имя 2',
      description: 'Описание второго набора',
      questions: [
        {
          id: 1,
          description: 'Чему равна единица',
          points: 1,
          wrongAnswers: ['2', '3', '4'],
          correctAnswers: ['1'],
        },
        {
          id: 2,
          description: 'Чему не равна единица',
          points: 2,
          wrongAnswers: ['1'],
          correctAnswers: ['2', '3', '4'],
        },
      ],
      execTime: 10,
    },
    {
      id: 3,
      name: 'Имя 3',
      description: 'Описание третьего набора',
      questions: [
        {
          id: 1,
          description: 'Чему равна единица',
          points: 1,
          wrongAnswers: ['2', '3', '4'],
          correctAnswers: ['1'],
        },

        {
          id: 3,
          description: 'Чему не равны 5 и 6',
          points: 3,
          wrongAnswers: ['5', '6'],
          correctAnswers: ['3', '4'],
        },
      ],
      execTime: 10,
    },
  ],
  progTasks: [
    {
      id: 2,
      name: 'Name2',
      description: 'description2',
      autoTests: ['test3', 'test4'],
      complexityAssessment: 20,
      examples: 'exmaple1',
      conditions: [
        {
          language: ProgrammingLanguage.Java,
          maxTime: 44444,
          maxMemory: 4,
        },
        {
          language: ProgrammingLanguage.Java,
          maxTime: 33333,
          maxMemory: 3,
        },
      ],
    },

    {
      id: 3,
      name: 'Name3',
      description: 'description3',
      examples: 'exmaple1',
      autoTests: ['test5', 'test6'],
      complexityAssessment: 30,
      conditions: [
        {
          language: ProgrammingLanguage.Java,
          maxTime: 66666,
          maxMemory: 6,
        },
        {
          language: ProgrammingLanguage.Java,
          maxTime: 55555,
          maxMemory: 5,
        },
      ],
    },
  ],
  creator: 'Pahan',
  timeOfCreation: 234,
  language: [ProgrammingLanguage.Java],
}

export type PersonState = {
  surname: string
  name: string
  patronymic?: string
  email: string
}
export const CardForm: React.FC<CardFormProps> = (props) => {
  const {className = '', link = 'blabla', user, closeModal} = props
  const vacanciesName = useSelector(getVacanciesName)
  const dispatch = useDispatch()
  const [selectedVacancies, setSelectedVacancies] = useState<string[]>(
    user ? Object.keys(user.vacancies) : []
  )
  const [personState, setPersonState] = useState<PersonState>({
    surname: user?.surname || '',
    name: user?.name || '',
    patronymic: user?.patronymic || '',
    email: user?.email || '',
  })

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
        setPersonState((prevState) => ({...prevState, surname: newValue}))
        break
      case 'name':
        setPersonState((prevState) => ({...prevState, name: newValue}))
        break
      case 'patronymic':
        setPersonState((prevState) => ({...prevState, patronymic: newValue}))
        break
      case 'email':
        setPersonState((prevState) => ({...prevState, email: newValue}))
        break
    }
  }

  const validateValue = () => {
    // TODO
  }
  const checkAndSendData = async () => {
    validateValue()
    let option: User
    if (user) {
      // const vacansiesUpdate: any = {}
      // selectedVacancies.forEach((vacancy) => {
      //   if (user.vacancies[vacancy]) {
      //     vacansiesUpdate[vacancy] = user.vacancies[vacancy]
      //   } else {
      //     vacansiesUpdate[vacancy] = {'1': taskSetMock}
      //   }
      // })
      option = {...user, ...personState}
      const answer = await sendUsersData(option)
      if (answer === 'OK') {
        dispatch(usersDataActions.setUpdateUsers(option))
      }
      closeModal()
    } else {
      option = {
        ...personState,
        id: 4,
        accessRights: UserRole.APPLICANT,
        actualLink: 'blablabalbal',
        startLinkTimestamp: '2023-04-30T21:00:00.000Z',
        endLinkTimestamp: '2023-04-30T21:00:00.000Z',
        vacancies: {'js-2019': {2: [taskSetMock]}},
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
            placeHolder='Выберите вакансию'
            changeSelect={(el) => Array.isArray(el) && setSelectedVacancies(el)}
            selected={selectedVacancies.map((vacancy) => ({value: vacancy, label: vacancy}))}
            options={vacanciesName.map((vacancy) => {
              return {label: vacancy, value: vacancy}
            })}
          ></MySelect>
        </div>
      </div>
      {user?.actualLink && (
        <div className={cls.link}>
          <span>{user?.actualLink}</span>{' '}
          <Button theme={ThemeButton.CLEAR} className={cls.copyBtn} onClick={copyLink}>
            <img src={CopySvg} alt='copy' />
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
