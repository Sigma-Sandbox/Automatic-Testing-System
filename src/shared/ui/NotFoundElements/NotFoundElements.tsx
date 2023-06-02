import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './NotFoundElements.module.scss'
import EmptySvg from 'shared/assets/icon/empty.png'

interface NotFoundElementsProps {
  className?: string
  text: string
}

export const NotFoundElements: React.FC<NotFoundElementsProps> = (props) => {
  const {className = '', text} = props

  return (
    <span className={cls.notFound}>
      {text} <img src={EmptySvg} alt='empty' />
    </span>
  )
}
