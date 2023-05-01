import React, {useEffect, useMemo} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './MainContainer.module.scss'
import {Start} from '../Start/Start'
import {getCurrentTask} from 'entities/TestTask'
import {useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {TaskCode} from '../TaskCode/TaskCode'
import {TaskTest} from '../TaskTest/TaskTest'
import {testUserActions} from 'widgets/Test/model/slice/TestSlice'
import {getTestItemData} from '../../model/selectors/getTest'
import {useSwitching} from 'shared/lib/hooks/useSwitching/useSwitching'
import {AppDispatch} from 'app/providers/StoreProvider/config/store'

interface MainContainerProps {
  className?: string
}

export const MainContainer: React.FC<MainContainerProps> = (props) => {
  const {className = ''} = props
  const location = useLocation()
  const testData = useSelector(getCurrentTask(location.state?.testId || 1))
  const testItemData = useSelector(getTestItemData)

  const [isSwitchPage, turnOnSwitching] = useSwitching()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    console.log(testItemData, testData)
    if (testItemData.currentItem !== 0) {
      document.body.style.setProperty('--count-main-test-item', `${testItemData.currentItem}`)
      turnOnSwitching()
    }
    return () => {
      document.body.style.setProperty('--count-main-test-item', `${0}`)
    }
  }, [testItemData.currentItem])

  useEffect(() => {
    if (testData?.data) {
      dispatch(testUserActions.setInitialData(testData.data))
    }
  }, [testData])

  const goNextPage = () => {
    dispatch(testUserActions.setNewCurrentItem(+testItemData.currentItem + 1))
  }

  const taskItem = useMemo(() => {
    const taskItemList = []
    if (testData) {
      taskItemList.push(
        <Start
          className={classNames(cls.mainItem, {[cls.animate]: isSwitchPage}, [])}
          timeLimits={testData.timeLimits}
          taskCount={testData.data?.length}
          name={testData.name}
          goNextPage={goNextPage}
        />
      )

      testData.data?.forEach((el) => {
        if ('description' in el) {
          taskItemList.push(
            <TaskCode className={classNames(cls.mainItem, {[cls.animate]: isSwitchPage}, [])} dataItem={el}></TaskCode>
          )
        } else {
          taskItemList.push(
            <TaskTest className={classNames(cls.mainItem, {[cls.animate]: isSwitchPage}, [])} dataItem={el}></TaskTest>
          )
        }
      })
    }
    return taskItemList
  }, [testData, testItemData, isSwitchPage])

  if (!(testData && testData?.data)) {
    return <div>Not data</div>
  }
  return <div className={classNames(cls.mainContainer, {}, [className])}>{taskItem}</div>
}
