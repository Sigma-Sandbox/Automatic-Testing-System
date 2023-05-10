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

interface NavabarProps {
  className?: string
}

export const Navbar: React.FC<NavabarProps> = (props) => {
  const {className = ''} = props
  const userData = useSelector(getUserData)
  const currentTestData = useSelector(getCurrentTestData)
  const {pathname} = useLocation()
  const [timeLimits, optionTimeLimits] = useTimer(currentTestData.timeLimits || 0)
  const navigate = useNavigate()

  useEffect(() => {
    if (+currentTestData?.currentItem > 0 && timeLimits === currentTestData.timeLimits) {
      optionTimeLimits.startTimer()
    }
  }, [currentTestData?.currentItem])
  useEffect(() => {
    console.log(currentTestData)
  }, [currentTestData?.currentItem])

  const finishTask = () => {
    optionTimeLimits.stopTimer()
    navigate(RoutePathCandidate.main)
  }

  return (
    <div
      className={classNames(cls.navbar, {[cls.collaps]: pathname === RoutePathCandidate.login}, [
        className,
        'container',
      ])}
    >
      <span className={classNames(cls.position, {[cls.collaps]: !!userData}, ['Box_invert_bg'])}>
        {userData?.position}
      </span>
      {currentTestData && (
        <div className={classNames(cls.testData, {}, [])}>
          <div className={classNames(cls.time, {[cls.show]: +currentTestData.currentItem > 0}, [])}>
            {optionTimeLimits.getTime(TimeType.MM_SS)}
          </div>
          <Button
            className={classNames(
              cls.btnCancel,
              {[cls.show]: +currentTestData.currentItem > 0},
              []
            )}
            color={ColorButton.RED_COLOR}
            size={SizeButton.L}
            onClick={finishTask}
          >
            Завершить
          </Button>
        </div>
      )}
      <div className={classNames(cls.name, {}, ['Box_invert_bg'])}>
        <span>{userData?.firstname}</span>
        <span>{userData?.lastname}</span>
      </div>
    </div>
  )
}
