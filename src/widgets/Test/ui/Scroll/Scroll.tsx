import React, {PropsWithChildren, useEffect} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Scroll.module.scss'
import {use} from 'nconf'

interface ScrollProps {
  className?: string
}

export const Scroll: React.FC<PropsWithChildren<ScrollProps>> = (props) => {
  const {className = '', children} = props

  return <div className={classNames(cls.scroll, {}, [className])}>{children}</div>
}
