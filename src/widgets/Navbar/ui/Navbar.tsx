import React, {useEffect} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import {useSelector} from 'react-redux'
import {getUserData} from '../model/selectors/getUserData'
import {Route, useLocation, useNavigate} from 'react-router-dom'
import {RoutePathCandidate} from 'shared/config/routeConfig/routeConfig'
import {getCurrentTestData} from '../model/selectors/getCurrentTestData'
import {TimeType, useTimer} from 'shared/lib/hooks/useTimer/useTimer'
import {Button, ColorButton, SizeButton} from 'shared/ui/Button/Button'
import {StateSchema} from 'app/providers/StoreProvider'
import {UserRole} from 'core/enums'
import {NavbarCandidate} from './NavbarCandidate'

interface NavabarProps {
  className?: string
}

export const Navbar: React.FC<NavabarProps> = (props) => {
  const {className = ''} = props
  const userData = useSelector(getUserData)
  const userRole = useSelector((state: StateSchema) => state.user.authData?.accessRights)
  const {pathname} = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(userRole)
  }, [userRole])

  return (
    <div
      className={classNames(cls.navbar, {[cls.collaps]: pathname === RoutePathCandidate.login}, [
        className,
        'container',
      ])}
    >
      {userRole === UserRole.APPLICANT && <NavbarCandidate />}

      <Button className={cls.btnExit}>Выйти</Button>
    </div>
  )
}
