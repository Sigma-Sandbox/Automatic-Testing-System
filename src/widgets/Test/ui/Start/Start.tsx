import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Start.module.scss'
import {Button, ColorButton, SizeButton} from 'shared/ui/Button/Button'

interface StartProps {
  className?: string
  name: string
  timeLimits: string | number
  taskCount?: number
  goNextPage: () => void
}

export const Start: React.FC<StartProps> = (props) => {
  const {className = '', name, timeLimits, taskCount, goNextPage} = props

  return (
    <div className={classNames(cls.startWrap, {}, [className])}>
      <div className={classNames(cls.start, {}, [])}>
        <div className={classNames('', {}, ['Brow_card'])}>Задание</div>
        <div className={classNames(cls.name, {}, [cls.cardItem])}>
          <span>{name}</span>
        </div>
        <div className={classNames(cls.taskCount, {}, [cls.cardItem])}>
          Количество задний: <span>{taskCount}</span>
        </div>
        <div className={classNames(cls.timeLimits, {}, [cls.cardItem])}>
          Ограничения по времени: <span>{timeLimits}</span>
        </div>

        <Button className={cls.btn} size={SizeButton.XL} color={ColorButton.SECONDARY_COLOR} onClick={goNextPage}>
          Начать
        </Button>
      </div>
    </div>
  )
}
