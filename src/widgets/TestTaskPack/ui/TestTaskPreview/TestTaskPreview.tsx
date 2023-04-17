import React, {useEffect} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './TestTaskPreview.module.scss'
import {TestTask} from 'entities/TestTask'
import taskImgSrc from 'shared/assets/icon/test_prev.svg'
import timerImgSrc from 'shared/assets/icon/timer_prev.svg'
import {Button, ColorButton, ThemeButton} from 'shared/ui/Button/Button'

interface TestTaskPreviewProps {
  className?: string
  countTask: number
  timeLimits: string | number
  name: string
  startTest: (idTest: string) => void
}

export const TestTaskPreview: React.FC<TestTaskPreviewProps> = (props) => {
  const {className = '', countTask, timeLimits, name, startTest} = props

  const handlerBtn = () => {
    startTest(name)
  }

  return (
    <div className={classNames(cls.testTaskPreview, {}, [className])}>
      <div className={cls.testName}>
        <span>{name}</span>
      </div>
      <div className={cls.testInfo}>
        <div className={classNames(cls.testCount, {}, [cls.testRight])}>
          <span>{countTask} задания</span>
          <img src={taskImgSrc} alt='test' />
        </div>
        <div className={classNames(cls.testTimer, {}, [cls.testRight])}>
          <span>{timeLimits}</span>
          <img src={timerImgSrc} alt='timer' />
        </div>

        <Button theme={ThemeButton.BACKGROUND} color={ColorButton.SECONDARY_COLOR} onClick={handlerBtn}>
          Начать
        </Button>
      </div>
    </div>
  )
}
