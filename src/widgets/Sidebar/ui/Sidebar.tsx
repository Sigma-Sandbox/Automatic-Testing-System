import React, {useCallback, useEffect, useMemo} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import {RoutePathCandidate} from 'shared/config/routeConfig/routeConfig'
import logoImgSrc from 'shared/assets/logo_sidebar.png'
import {useDispatch, useSelector} from 'react-redux'
import {getUserAuthData} from 'entities/Candidate/User'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {getTestItemData} from '../model/selectors/getTestItemData'
import {SidebarItem} from './SidebarItem/SidebarItem'
import {testUserActions} from 'widgets/Candidate/Test'
import {useSwitching} from 'shared/lib/hooks/useSwitching/useSwitching'

interface SidebarProps {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const {className = ''} = props
  const userAuthData = useSelector(getUserAuthData)
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const testItem = useSelector(getTestItemData)
  const dispatch = useDispatch()
  const [, turnOnSwitching] = useSwitching()

  const testItemList = useMemo(() => {
    if (!testItem) return null

    const goToTask = (newItem: number) => {
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
    <div
      className={classNames(cls.sidebar, {[cls.collaps]: pathname === RoutePathCandidate.login}, [
        className,
      ])}
    >
      <img className={cls.logo} src={logoImgSrc} alt='logo' />

      <div className={cls.itemsWrap}>
        <div className={cls.items}>{testItemList}</div>
      </div>
    </div>
  )
}
