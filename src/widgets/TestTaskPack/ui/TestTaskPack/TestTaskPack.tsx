import React, {useMemo, useEffect} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './TestTaskPack.module.scss'
import {useSelector} from 'react-redux'
import {getTestTaskPreview} from '../../model/selectors/getTestTaskPreview'
import {TestTaskPreview} from '../TestTaskPreview/TestTaskPreview'
import {time} from 'console'

interface TestTaskPackProps {
  className?: string
  startTest: (idTest: string) => void
}

export const TestTaskPack: React.FC<TestTaskPackProps> = (props) => {
  const {className = '', startTest} = props
  const testTaskItemList = useSelector(getTestTaskPreview)

  const testTaskListMemo = useMemo(
    () =>
      testTaskItemList?.data?.map((item) => (
        <TestTaskPreview
          timeLimits={item.timeLimits}
          countTask={item.taskCount}
          name={item.name}
          startTest={startTest}
        />
      )),
    [testTaskItemList]
  )

  return (
    <div className={classNames(cls.testTaskPack, {}, [className])}>
      <div className={classNames(cls.testTaskBrow)}>Тестовые задания</div>
      <div className={cls.testTaskList}>{testTaskListMemo.length > 0 ? testTaskListMemo : 'Заданий нет'}</div>
    </div>
  )
}
