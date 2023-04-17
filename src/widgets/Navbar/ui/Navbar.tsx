import React, { useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { useSelector } from 'react-redux'
import { getUserData } from '../model/selectors/getUserData'
import { Route, useLocation } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

interface NavabarProps {
  className?: string
}

export const Navbar: React.FC<NavabarProps> = (props) => {
  const { className = '' } = props
  const userData = useSelector(getUserData)
  const { pathname } = useLocation()

  useEffect(() => {
    console.log(userData)
  }, [userData])

  return (
    <div
      className={classNames(
        cls.navbar,
        { [cls.collaps]: pathname === RoutePath.login },
        [className, 'container']
      )}
    >
      <span
        className={classNames(cls.position, { [cls.collaps]: !!userData }, [
          'box_invert_bg',
        ])}
      >
        {userData?.position}
      </span>

      <div className={classNames(cls.name, {}, ['box_invert_bg'])}>
        <span>{userData?.firstname}</span>
        <span>{userData?.lastname}</span>
      </div>
    </div>
  )
}
