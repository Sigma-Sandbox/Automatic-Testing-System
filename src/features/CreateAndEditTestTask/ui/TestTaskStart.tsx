import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CreateAndEditTestTask.module.scss'
import { Input } from 'shared/ui/Input/Input'
import { Button, ColorButton, SizeButton } from 'shared/ui/Button/Button'
import { infoTestTask } from './CreateAndEditTestTask'

interface TestTaskStartProps {
  className?: string
  info: infoTestTask
  handlerInfo: (state: string, value: string) => void
  nextTask: () => void
}

export const TestTaskStart: React.FC<TestTaskStartProps> = (props) => {
  const { className = '', info, handlerInfo, nextTask } = props

  return (
    <div className={classNames(cls.testTaskStart, {}, [className])}>
      <Input
        className={cls.startInp}
        value={info.name}
        placeholder={'Название'}
        onChange={(value) => handlerInfo('name', value)}
      />
      <Input
        className={cls.startInp}
        value={info.description}
        placeholder={'Описание'}
        onChange={(value) => handlerInfo('description', value)}
      />
      <Input
        className={cls.startInp}
        value={info.execTime + ''}
        type="number"
        placeholder={'Ограничение по времени (сек)'}
        onChange={(value) => handlerInfo('execTime', value)}
      />

      <Button
        className={classNames(cls.startBtn, {}, [])}
        color={ColorButton.PRIMARY_COLOR}
        size={SizeButton.L}
        onClick={nextTask}
      >
        Продолжить
      </Button>
    </div>
  )
}
