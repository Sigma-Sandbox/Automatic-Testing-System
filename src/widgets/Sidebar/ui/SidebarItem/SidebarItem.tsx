import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './SidebarItem.module.scss'
import {StatusItemTest} from 'widgets/Test'

interface SidebarItemProps {
  className?: string
  status: StatusItemTest
  count: string | number
  selectId: string | number
  handler: (newItem: number) => void
}

export const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  const {className = '', count, status, selectId, handler} = props

  return (
    <div
      className={classNames(cls.item, {[cls.select]: selectId === count}, [className, cls[status], cls.backImg])}
      onClick={() => handler(+count)}
    >
      {count}
    </div>
  )
}
