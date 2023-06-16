import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TestTaskPreview.module.scss'
import taskImgSrc from 'shared/assets/icon/test_prev.svg'
import timerImgSrc from 'shared/assets/icon/timer_prev.svg'
import { Button, ColorButton, ThemeButton } from 'shared/ui/Button/Button'
import { timeConverter } from 'utils/dataConverter'

interface TestTaskPreviewProps {
  className?: string
  countTask: number
  timeLimits: number
  name: string
  vacancyId: number
  id: number | undefined
  startTest: (testId: string, vacancyId: number) => void
}

export const TestTaskPreview: React.FC<TestTaskPreviewProps> = (props) => {
  const { className = '', countTask, timeLimits, id, name, startTest, vacancyId } = props

  const handlerBtn = () => {
    startTest(id + '', vacancyId)
  }

  return (
    <div className={classNames(cls.testTaskPreview, {}, [className])}>
      <div className={cls.testName}>
        <span>{name}</span>
      </div>
      <div className={cls.testInfo}>
        <div className={classNames(cls.testCount, {}, [cls.testRight])}>
          <span>Tasks: {countTask}</span>
          <img src={taskImgSrc} alt="test" />
        </div>
        <div className={classNames(cls.testTimer, {}, [cls.testRight])}>
          <span>{timeConverter(timeLimits)}</span>
          <img src={timerImgSrc} alt="timer" />
        </div>

        <Button theme={ThemeButton.BACKGROUND} color={ColorButton.SECONDARY_COLOR} onClick={handlerBtn}>
          Начать
        </Button>
      </div>
    </div>
  )
}
