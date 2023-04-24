import React, {useEffect, useMemo, useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './TaskTest.module.scss'
import {TaskTestItem} from './TaskTestItem'
import markImg from 'shared/assets/icon/check.svg'
import {TaskTestStart} from './TaskTestStart'
import markSrc from 'shared/assets/icon/check.svg'
import {TimeType, useTimer} from 'shared/lib/hooks/useTimer/useTimer'

interface TaskTestProps {
  className?: string
  allCountTest?: number
  testItem?: {id: number; descript: string; rightAns: string[]; wrongAns: string[]}[]
  name?: string
  time?: string
}

export const TaskTest: React.FC<TaskTestProps> = (props) => {
  const {
    className = '',
    allCountTest = 5,
    name = 'Тест на знание JS',
    time = '25:00',
    testItem = [
      {
        id: 1,
        descript: 'Какие существуют типы данных в JavaScript?',
        rightAns: ['Boolean', 'String', 'Number'],
        wrongAns: ['Function', 'Class'],
      },
      {
        id: 2,
        descript: 'Какие существуют типы данных в Java?',
        rightAns: ['byte', 'short', 'int'],
        wrongAns: ['char', 'boolean'],
      },
      {
        id: 3,
        descript: 'Как называется код между фигурными скобками?',
        rightAns: ['функция', 'секция', 'тело', 'блок'],
        wrongAns: ['function', 'int'],
      },
      {
        id: 4,
        descript: 'В чем разница между char и Character?',
        rightAns: ['нет разницы, они оба примитивные типы'],
        wrongAns: ['char является классом, а Character примитивным типом', 'нет разницы, они оба классы'],
      },
      {
        id: 5,
        descript: 'Какие существуют типы данных в JavaScript?',
        rightAns: ['Boolean'],
        wrongAns: ['Function', 'Class', 'String', 'Number'],
      },
    ],
  } = props
  const [currentTestItem, setCurrentTestItem] = useState<number>(0)
  const [timer, timeOptions] = useTimer(600)

  useEffect(() => {
    document.body.style.setProperty('--count-test-item', `${currentTestItem}`)
  }, [currentTestItem])

  useEffect(() => {
    console.log('effect')
  })

  const nextQuestion = () => {
    if (allCountTest > currentTestItem) {
      setCurrentTestItem(currentTestItem + 1)
    }
    if (allCountTest === currentTestItem) {
      finishTest()
      setCurrentTestItem(currentTestItem + 1)
    }
  }

  const startTest = () => {
    setCurrentTestItem(currentTestItem + 1)
    timeOptions.startTimer()
  }

  const finishTest = () => {
    timeOptions.stopTimer()
  }

  const navbarItem = useMemo(() => {
    const navbarList = []
    for (let i = 0; i <= allCountTest + 1; i++) {
      navbarList.push(
        <div
          className={classNames(
            cls.navbarItem,
            {[cls.passed]: i < currentTestItem, [cls.select]: i === currentTestItem},
            []
          )}
        >
          {i === allCountTest + 1 ? <img src={markImg} alt='mark' /> : i}
        </div>
      )
    }

    return navbarList
  }, [currentTestItem])

  const taskTestItem = useMemo(() => {
    console.log('taskTestItem')
    const taskTestList = []

    taskTestList.push(
      <TaskTestStart startTest={startTest} name={name} time={time} allCountTest={allCountTest}></TaskTestStart>
    )

    testItem.forEach((item) => {
      taskTestList.push(
        <TaskTestItem
          nextQuestion={nextQuestion}
          descript={item.descript}
          wrongAns={item.wrongAns}
          rightAns={item.rightAns}
        ></TaskTestItem>
      )
    })

    taskTestList.push(
      <div className={classNames(cls.taskTestItem, {}, [cls.taskTestFinish])}>
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
