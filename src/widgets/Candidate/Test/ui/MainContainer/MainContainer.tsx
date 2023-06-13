import React, { useEffect, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './MainContainer.module.scss'
import { Start } from '../Start/Start'
import { getCurrentTask } from 'entities/Candidate/TestTask'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TaskCode } from '../TaskCode/TaskCode'
import { TaskTest } from '../TaskTest/TaskTest'
import { testUserActions } from 'widgets/Candidate/Test/model/slice/TestSlice'
import { getTestItemData } from '../../model/selectors/getTest'
import { useSwitching } from 'shared/lib/hooks/useSwitching/useSwitching'
import { AppDispatch } from 'app/providers/StoreProvider/config/store'
import { Button, ColorButton, ThemeButton } from 'shared/ui/Button/Button'
import upPageSrc from 'shared/assets/icon/up_page.svg'
import downPageSrc from 'shared/assets/icon/down_page.svg'

interface MainContainerProps {
  className?: string
}
enum SwitcherItemType {
  DISABLE = 'disable',
  DISABLE_UP = 'disable_up',
  DISABLE_DOWN = 'disable_down',
  HIDE = 'hide',
  DEF = 'def',
}

export const MainContainer: React.FC<MainContainerProps> = (props) => {
  const { className = '' } = props
  const location = useLocation()
  const testData = useSelector(getCurrentTask(location.state?.testId || 1))
  const testItemData = useSelector(getTestItemData)
  const [startedTest, setStartedTest] = useState<boolean>(false)
  const [isSwitchPage, turnOnSwitching] = useSwitching()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (testItemData.currentItem !== 0) {
      document.body.style.setProperty('--count-main-test-item', `${testItemData.currentItem}`)
      turnOnSwitching()
    }
    return () => {
      document.body.style.setProperty('--count-main-test-item', `${0}`)
    }
  }, [testItemData.currentItem])

  useEffect(() => {
    if (testData) {
      const progTask = testData.progTasks || []
      const testTask = testData.testTasks || []
      dispatch(
        testUserActions.setInitialData({
          task: [...progTask, ...testTask],
          testPackId: location.state.testId,
        })
      )
    }
  }, [testData?.progTasks, testData?.testTasks])

  const goToTask = (newTask: number) => {
    dispatch(testUserActions.setNewCurrentItem(newTask))
  }
  const changeStartedTest = (state: boolean) => {
    setStartedTest(state)
  }
  const taskItem = useMemo(() => {
    const taskItemList = []
    if (testData) {
      taskItemList.push(
        <Start
          key={'start task test'}
          className={classNames(cls.mainItem, { [cls.animate]: isSwitchPage }, [])}
          timeLimits={testData.timeLimits}
          taskCount={testItemData.allCountItem}
          name={testData.name}
          goNextPage={goToTask}
        />
      )
      const progAndTestItem = [...(testData.progTasks || []), ...(testData.testTasks || [])]

      progAndTestItem.forEach((el) => {
        if ('questions' in el) {
          taskItemList.push(
            <TaskTest
              key={el.id}
              className={classNames(cls.mainItem, { [cls.animate]: isSwitchPage }, [])}
              dataItem={{ ...el, numOfTry: testData.numOfTry, vacancyId: testData.vacancyId }}
              isStartedTest={changeStartedTest}
            ></TaskTest>
          )
        } else {
          taskItemList.push(
            <TaskCode
              key={el.id}
              className={classNames(cls.mainItem, { [cls.animate]: isSwitchPage }, [])}
              dataItem={{ ...el, numOfTry: testData.numOfTry, vacancyId: testData.vacancyId }}
            ></TaskCode>
          )
        }
      })
    }
    return taskItemList
  }, [testData, testItemData, isSwitchPage])

  const switcherTaskState = useMemo<SwitcherItemType>(() => {
    if (testItemData.currentItem === 0 || testItemData.allCountItem === 1) return SwitcherItemType.HIDE
    // if (startedTest) return SwitcherItemType.DISABLE
    if (testItemData.currentItem === 1) return SwitcherItemType.DISABLE_UP
    if (testItemData.currentItem === taskItem.length - 1) return SwitcherItemType.DISABLE_DOWN
    return SwitcherItemType.DEF
  }, [testItemData.currentItem, startedTest])

  if (!(testData && (testData?.progTasks || testData.testTasks))) {
    return <div>Not data</div>
  }
  return (
    <div className={classNames(cls.mainContainer, {}, [className])}>
      <Button
        theme={ThemeButton.CLEAR}
        color={ColorButton.TRANSPARENT}
        onClick={() => goToTask(+testItemData.currentItem - 1)}
        className={classNames(
          cls.toggleTask,
          {
            [cls.disable]:
              switcherTaskState === SwitcherItemType.DISABLE || switcherTaskState === SwitcherItemType.DISABLE_UP,
            [cls.hide]: switcherTaskState === SwitcherItemType.HIDE,
          },
          [cls.toggleUp]
        )}
      >
        <img src={upPageSrc} />
      </Button>
      {taskItem}
      <Button
        theme={ThemeButton.CLEAR}
        color={ColorButton.TRANSPARENT}
        onClick={() => goToTask(+testItemData.currentItem + 1)}
        className={classNames(
          cls.toggleTask,
          {
            [cls.disable]:
              switcherTaskState === SwitcherItemType.DISABLE || switcherTaskState === SwitcherItemType.DISABLE_DOWN,
            [cls.hide]: switcherTaskState === SwitcherItemType.HIDE,
          },
          [cls.toggleDown]
        )}
      >
        <img src={downPageSrc} />
      </Button>
    </div>
  )
}
