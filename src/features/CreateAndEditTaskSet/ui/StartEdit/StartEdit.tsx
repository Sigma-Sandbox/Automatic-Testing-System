import React, {useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './StartEdit.module.scss'
import {Button, SizeButton} from 'shared/ui/Button/Button'
import {Input} from 'shared/ui/Input/Input'

interface StartEditProps {
  className?: string
  data: {name: string; time: string}
}

export const StartEdit: React.FC<StartEditProps> = (props) => {
  const {className = '', data} = props
  const [name, setName] = useState<string>(data.name)
  const [date, setDate] = useState<string>(data.time)

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
          value={date}
          onChange={(newValue) => setDate(newValue)}
          placeholder='Время'
        ></Input>
        <Button size={SizeButton.XL} className={cls.btn}>
          Продожить
        </Button>
      </div>
    </div>
  )
}
