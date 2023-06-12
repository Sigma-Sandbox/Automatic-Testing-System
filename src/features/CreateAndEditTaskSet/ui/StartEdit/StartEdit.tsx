import React, {useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './StartEdit.module.scss'
import {Button, SizeButton} from 'shared/ui/Button/Button'
import {Input} from 'shared/ui/Input/Input'
import { CommonTask } from '../MainEditTaskSet/MainEditTaskSet'
import { MySelect } from 'shared/ui/Select/Select'
import { ProgrammingLanguage } from 'core/enums'

interface StartEditProps {
  className?: string
  data: CommonTask
  next: (commonTask: CommonTask) => void
}

export const StartEdit: React.FC<StartEditProps> = (props) => {
  const {className = '', data, next} = props
  const [name, setName] = useState<string>(data.name)
  const [date, setDate] = useState<number>(data.time)
  const [description, setDescription] = useState<string>(data.description)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(data.languages)

  return (
    <div className={cls.container}>
      <div className={classNames(cls.startEdit, {}, [className])}>
        <Input
          className={cls.input}
          value={name}
          onChange={(newValue) => setName(newValue)}
          placeholder='Название'
        ></Input>
        <Input
          className={cls.input}
          value={date > 0 ? `${date}` : ''}
          onChange={(newValue) => setDate(+newValue)}
          placeholder='Время (мин)'
        ></Input>
        <Input
          className={cls.input}
          value={description}
          onChange={(newValue) => setDescription(newValue)}
          placeholder='Описание'
        ></Input>
        <MySelect
            className={cls.languagesSelect}
            isMulti={true}
            placeHolder="Выбрать язык программирования"
            changeSelect={(el) => Array.isArray(el) && setSelectedLanguages(el)}
            selected={selectedLanguages.map(language => ({
              value: language,
              label: language,
            }))}
            options={Object.values(ProgrammingLanguage).map((language) => {
              return {
                label: language,
                value: language
              }
            })}
        ></MySelect>
        <Button size={SizeButton.XL} className={cls.btn} onClick={() => next({
          name: name,
          time: date,
          languages: selectedLanguages as ProgrammingLanguage[],
          description: description
        })}> Продолжить </Button>
      </div>
    </div>
  )
}
