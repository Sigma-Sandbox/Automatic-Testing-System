import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TaskTest.module.scss'
import { TaskTestItem } from './TaskTestItem'
import markImg from 'shared/assets/icon/check.svg'
import { TaskTestStart } from './TaskTestStart'
import { TimeType, useTimer } from 'shared/lib/hooks/useTimer/useTimer'
import { TestTask } from 'entities/TestTask'
import { UserSolution, WithNumOfTry, WithVacancyId } from 'core/entities'
import { TaskResult, TaskType } from 'core/enums'

interface TaskTestProps {
  className?: string
  dataItem: WithVacancyId<WithNumOfTry<TestTask>>
}

enum TypeTransformState {
  MAIN_ITEM = 'CARD_ITEM',
  NAVBAR_ITEM = 'NAVBAR_ITEM',
}
export const TaskTest: React.FC<TaskTestProps> = (props) => {
  const className = props.className || ''
  const {id, name = 'Тест на знание JS', timeLimits = 1800, testItem, numOfTry, vacancyId} = props.dataItem
  const [currentTestItem, setCurrentTestItem] = useState<number>(0)
  const [timer, timeOptions] = useTimer(600)
  const taskCount = testItem.length

  useEffect(() => {
    document.body.style.setProperty('--count-test-item', `${currentTestItem}`)
  }, [currentTestItem])

  const nextQuestion = (selectedItems: string[], result: boolean) => {
    if (taskCount > currentTestItem) {
      setCurrentTestItem(currentTestItem + 1)
    }
    if (taskCount === currentTestItem) {
      finishTest()
      setCurrentTestItem(currentTestItem + 1)
    }

    // FIXME: userId, execStartTime, taskSetId поправить на нужные
    const userSolution: UserSolution = {
      taskId: id,
      numOfTry: numOfTry,
      userId: 1,
      vacancyId: vacancyId,
      execStartTime: Date.now() - 1000,
      execEndTime: Date.now(),
      taskSetId: 1,
      taskType: TaskType.TEST_QUESTION,
      result: result ? TaskResult.DONE : TaskResult.FAIL,
      questionAnswers: selectedItems
    }

    postUserSolutionQuestion(userSolution)
  }

  const postUserSolutionQuestion = async (solution: UserSolution) => {
    fetch('api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(solution),
    })
  }

  const startTest = () => {
    setCurrentTestItem(currentTestItem + 1)
    timeOptions.startTimer()
  }

  const finishTest = () => {
    timeOptions.stopTimer()
  }

  const calcTransformState = useCallback(
    (type: TypeTransformState) => {
      switch (type) {
        case TypeTransformState.MAIN_ITEM:
          return `translateX(calc(${currentTestItem} * -100%))`
          break
        case TypeTransformState.NAVBAR_ITEM:
          return `translateX(calc(450% + (${currentTestItem}) * -150%))`
          break
      }
    },
    [currentTestItem]
  )

  const navbarItem = useMemo(() => {
    const navbarList = []
    for (let i = 0; i <= taskCount + 1; i++) {
      navbarList.push(
        <div
          className={classNames(
            cls.navbarItem,
            {[cls.passed]: i < currentTestItem, [cls.select]: i === currentTestItem},
            []
          )}
          style={{transform: calcTransformState(TypeTransformState.NAVBAR_ITEM)}}
        >
          {i === taskCount + 1 ? <img src={markImg} alt='mark' /> : i}
        </div>
      )
    }

    return navbarList
  }, [currentTestItem])

  const taskTestItem = useMemo(() => {
    const taskTestList = []

    taskTestList.push(
      <TaskTestStart
        startTest={startTest}
        name={name}
        time={timeLimits}
        allCountTest={taskCount}
        currentTestItem={currentTestItem}
      ></TaskTestStart>
    )

    testItem.forEach((item) => {
      taskTestList.push(
        <TaskTestItem
          key={'test item' + item.id}
          nextQuestion={nextQuestion}
          descript={item.description}
          wrongAns={item.wrongAns}
          rightAns={item.rightAns}
          calcTransform={calcTransformState(TypeTransformState.MAIN_ITEM)}
        ></TaskTestItem>
      )
    })

    taskTestList.push(
      <div
        className={classNames(cls.taskTestItem, {}, [cls.taskTestFinish])}
        style={{transform: calcTransformState(TypeTransformState.MAIN_ITEM)}}
      >
        Тест пройден <img src={markImg} alt='mark'></img>
      </div>
    )

    return taskTestList
  }, [currentTestItem])

  return (
    <div className={classNames('', {}, [className])}>
      <div className={classNames(cls.taskTestWrap)}>
        <div className={classNames(cls.timeTask, {[cls.show]: currentTestItem > 0}, [])}>
          {timeOptions.getTime(TimeType.MM_SS)}
        </div>
        <div className={classNames(cls.navbarTask)}>{navbarItem}</div>
        <div className={classNames(cls.taskTest, {}, [])}>{taskTestItem}</div>
      </div>
    </div>
  )
}
