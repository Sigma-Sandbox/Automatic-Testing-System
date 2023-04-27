import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './TestPage.module.scss'
import {MainContainer} from 'widgets/Test'

interface TestPageProps {
  className?: string
}

export const TestPage: React.FC<TestPageProps> = (props) => {
  const {className = ''} = props

  return (
    <div className={classNames(cls.testPage, {}, [className, cls.testContainer])}>
      <MainContainer />
    </div>
  )
}
