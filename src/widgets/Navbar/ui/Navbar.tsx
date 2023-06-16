import React, { useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { useSelector } from 'react-redux'
import { getUserData } from '../model/selectors/getUserData'
import { Route, useLocation, useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Button } from 'shared/ui/Button/Button'
import { StateSchema } from 'app/providers/StoreProvider'
import { UserRole } from 'core/enums'
import { NavbarCandidate } from './NavbarCandidate'

interface NavabarProps {
  className?: string
}

export const Navbar: React.FC<NavabarProps> = (props) => {
  const { className = '' } = props
  const userData = useSelector(getUserData)
  const userRole = useSelector((state: StateSchema) => state.user.authData?.accessRights)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  if (userRole === UserRole.APPLICANT) {
    return (
      <div
        className={classNames(cls.navbar, { [cls.collaps]: pathname === RoutePath.login }, [className, 'container'])}
      >
        <div className={classNames(cls.navbarContent)}>
          <NavbarCandidate />
        </div>
      </div>
    )
  }

  const handleOnExit = () => {
    navigate(RoutePath.login)
  }

  return (
    <div
      className={classNames(cls.navbar, { [cls.collaps]: pathname === RoutePath.login }, [
        className,
        cls.navbarSticky,
        'container',
      ])}
    >
      <div className={classNames(cls.navbarContent, {}, [cls.navbarAdmin])}>
        <div className={classNames(cls.name, {}, ['Box_invert_bg'])}>
          <span>{userData?.firstname}</span>
          <span>{userData?.lastname}</span>
        </div>
        <Button className={cls.btnExit} onClick={handleOnExit}>
          Выйти
        </Button>
      </div>
    </div>
  )
}
