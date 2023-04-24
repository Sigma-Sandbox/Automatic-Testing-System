import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './TaskCode.module.scss'

interface TaskCodeProps {
  className?: string
}

export const TaskCode: React.FC<TaskCodeProps> = (props) => {
  const {className = ''} = props

  return <div className={classNames(cls.taskCode, {}, [className])}>task code</div>
}
