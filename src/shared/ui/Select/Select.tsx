import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'

interface SelectProps {
  className?: string
  listOptions: string[]
  selected: string
  placeHolder?: string
  changeSelect: () => void
}

export const Select: React.FC<SelectProps> = (props) => {
  const {className = ''} = props

  return <div className={classNames(cls.select, {}, [className])}></div>
}
