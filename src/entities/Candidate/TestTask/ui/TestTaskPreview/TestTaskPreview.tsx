import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TestTaskPreview.module.scss'

interface TestTaskPreviewProps {
  className?: string
}

export const TestTaskPreview: React.FC<TestTaskPreviewProps> = (props) => {
  const { className = '' } = props

  return (
    <div className={classNames(cls.testTaskPreview, {}, [className])}></div>
  )
}
