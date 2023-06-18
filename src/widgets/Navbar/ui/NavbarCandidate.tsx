import React, { useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../model/selectors/getUserData'
import { Route, useLocation, useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { getCurrentTestData } from '../model/selectors/getCurrentTestData'
import { TimeType, useTimer } from 'shared/lib/hooks/useTimer/useTimer'
import { Button, ColorButton, SizeButton } from 'shared/ui/Button/Button'
import { testUserActions } from 'widgets/Candidate/Test'
import { getUserAuthData } from 'entities/User'
import { testTaskActions } from 'entities/Candidate/TestTask'

interface NavabarCandidateProps {
  className?: string
}

export const NavbarCandidate: React.FC<NavabarCandidateProps> = (props) => {
  const { className = '' } = props
  const userData = useSelector(getUserData)
  const userAuthData = useSelector(getUserAuthData)
  const currentTestData = useSelector(getCurrentTestData)
  const { pathname, state } = useLocation()

  const [timeLimits, optionTimeLimits] = useTimer(currentTestData.timeLimits || 0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (+currentTestData?.currentItem > 0 && timeLimits === currentTestData.timeLimits) {
      optionTimeLimits.startTimer()
    }
  }, [currentTestData?.currentItem, pathname])

  useEffect(() => {
    optionTimeLimits.setNewTime(currentTestData.timeLimits || 0)
  }, [currentTestData.timeLimits])

  useEffect(() => {
    if (timeLimits === 0) {
      finishTask()
    }
  }, [timeLimits])

  const finishTask = () => {
    optionTimeLimits.stopTimer()

    if (state) dispatch(testTaskActions.setDeleteTaskSet({ vacancyId: state.vacancyId, taskSetId: state.testId }))
    dispatch(testUserActions.setInitialData({ task: [], testPackId: -10 }))

    navigate('/vacancy/' + userAuthData?.actualLink || '')
  }

  return (
    <>
      {pathname.includes(RoutePath.test) && (
        <div className={classNames(cls.testData, {}, [])}>
          <div className={classNames(cls.time, { [cls.show]: +currentTestData.currentItem > 0 }, [])}>
            {optionTimeLimits.getTime(TimeType.MM_SS)}
          </div>
          <Button
            className={classNames(cls.btnCancel, { [cls.show]: +currentTestData.currentItem > 0 }, [])}
            color={ColorButton.RED_COLOR}
            size={SizeButton.L}
            onClick={finishTask}
          >
            Завершить
          </Button>
        </div>
      )}

      <div className={classNames(cls.name, { [cls.close]: pathname.includes(RoutePath.test) }, ['Box_invert_bg'])}>
        <span>{userData?.firstname}</span>
        <span>{userData?.lastname}</span>
      </div>
    </>
  )
}
