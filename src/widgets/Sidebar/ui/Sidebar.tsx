import React, { useCallback, useEffect, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import logoImgSrc from 'shared/assets/logo_sidebar.png'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

interface SidebarProps {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { className = '' } = props
  const userAuthData = useSelector(getUserAuthData)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div
      className={classNames(
        cls.sidebar,
        { [cls.collaps]: pathname === RoutePath.login },
        [className]
      )}
    >
      <img className={cls.logo} src={logoImgSrc} alt='logo' />
    </div>
  )
}
