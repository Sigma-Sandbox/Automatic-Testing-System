import React, { useCallback, useEffect, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig'
import logoImgSrc from 'shared/assets/logo_sidebar.png'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData, getUserRole } from 'entities/User'
import { useLocation, useNavigate } from 'react-router-dom'
import { getTestItemData } from '../model/selectors/getTestItemData'
import { SidebarItem } from './SidebarItem/SidebarItem'
import { testUserActions } from 'widgets/Candidate/Test'
import { useSwitching } from 'shared/lib/hooks/useSwitching/useSwitching'
import { Button, ColorButton, ThemeButton } from 'shared/ui/Button/Button'
import { UserRole } from 'core/enums'

import createImg from 'shared/assets/icon/icons8-test-66.png'
import testsImg from 'shared/assets/icon/icons8-test-64 (5).png'
import usersImg from 'shared/assets/icon/icons8-vacancy-64.png'
import vacancyImg from 'shared/assets/icon/icons8-job-60.png'
import { StateSchema } from 'app/providers/StoreProvider'

interface SidebarProps {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { className = '' } = props
  const userAuthData = useSelector(getUserAuthData)
  const userRole = useSelector(getUserRole)

  const userInfo = useSelector((state: StateSchema) => state.user)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const testItem = useSelector(getTestItemData)
  const dispatch = useDispatch()
  const [, turnOnSwitching] = useSwitching()

  useEffect(() => {
    console.log(userRole, userInfo)
  }, [])

  const testItemList = useMemo(() => {
    if (!testItem) return null

    const goToTask = (newItem: number) => {
      if (newItem === 0) return
      dispatch(testUserActions.setNewCurrentItem(newItem))
      turnOnSwitching()
    }
    return Object.entries(testItem?.statusItem || {}).map(([key, value]) => {
      return (
        <SidebarItem
          key={value.id}
          count={key}
          status={value.status}
          selectId={`${testItem.currentItem}`}
          handler={goToTask}
        />
      )
    })
  }, [testItem, testItem?.currentItem, testItem.statusItem])

  return (
    <div className={classNames(cls.sidebar, { [cls.collaps]: pathname === RoutePath.login }, [className])}>
      <img className={cls.logo} src={logoImgSrc} alt="logo" />

      <div className={cls.itemsWrap}>
        {userRole === UserRole.APPLICANT && <div className={cls.items}>{testItemList}</div>}
        {(userRole === UserRole.ADMIN || userRole === UserRole.EMPLOYEE) && (
          <div className={cls.itemsAdmin}>
            <Button
              className={classNames(cls.link, { [cls.active]: pathname.includes(AppRoutes.MAIN) }, [])}
              theme={ThemeButton.CLEAR}
              color={ColorButton.TRANSPARENT}
              onClick={() => navigate(RoutePath.main)}
            >
              <img src={usersImg} alt="Img7" />
            </Button>
            <Button
              className={classNames(cls.link, { [cls.active]: pathname.includes(AppRoutes.VACANCY) }, [])}
              theme={ThemeButton.CLEAR}
              color={ColorButton.TRANSPARENT}
              onClick={() => navigate(RoutePath.vaca)}
            >
              <img src={vacancyImg} alt="Img8" />
            </Button>
            <Button
              className={classNames(cls.link, { [cls.active]: pathname.includes(AppRoutes.TASK_SET) }, [])}
              theme={ThemeButton.CLEAR}
              color={ColorButton.TRANSPARENT}
              onClick={() => navigate(RoutePath.tests)}
            >
              <img src={testsImg} alt="Img1" />
            </Button>
            <Button
              className={classNames(cls.link, { [cls.active]: pathname.includes(AppRoutes.CREATE) }, [])}
              theme={ThemeButton.CLEAR}
              color={ColorButton.TRANSPARENT}
              onClick={() => navigate(RoutePath.create)}
            >
              <img src={createImg} alt="Img6" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
