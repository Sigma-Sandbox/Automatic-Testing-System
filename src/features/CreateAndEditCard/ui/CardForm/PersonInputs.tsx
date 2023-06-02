import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './CardForm.module.scss'
import {Input} from 'shared/ui/Input/Input'
import {PersonState} from './CardForm'

interface PersonInputsProps {
  className?: string
  personState: PersonState
  changeState: (value: string, type: string) => void
}

export const PersonInputs: React.FC<PersonInputsProps> = (props) => {
  const {className = '', personState, changeState} = props

  return (
    <div className={cls.personData}>
      <Input
        onChange={(value) => changeState(value, 'surname')}
        value={personState.surname}
        className={cls.input}
        placeholder='Фамилия'
      ></Input>
      <Input
        onChange={(value) => changeState(value, 'name')}
        value={personState.name}
        className={cls.input}
        placeholder='Имя'
      ></Input>
      <Input
        onChange={(value) => changeState(value, 'patronymic')}
        value={personState.patronymic}
        className={cls.input}
        placeholder='Отчество'
      ></Input>
      <Input
        onChange={(value) => changeState(value, 'email')}
        value={personState.email}
        className={cls.input}
        placeholder='Электронная почта'
      ></Input>
    </div>
  )
}
