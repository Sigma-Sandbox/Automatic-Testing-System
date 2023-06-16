import React, { useEffect, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TestTaskPack.module.scss'
import { useSelector } from 'react-redux'
// import { getTestTaskPreview } from '../../model/selectors/getTestTaskPreview'
import { TestTaskPreview } from '../TestTaskPreview/TestTaskPreview'
import { selectTestTask } from 'entities/Candidate/TestTask'
import { User } from 'entities/User'

interface TestTaskPackProps {
  className?: string
  startTest: (testId: string, vacancyId: number) => void
}

export const TestTaskPack: React.FC<TestTaskPackProps> = (props) => {
  const { className = '', startTest } = props
  const testTaskItemList = useSelector(selectTestTask)

  const testTaskListMemo = useMemo(() => {
    if (testTaskItemList) {
      const allVacancies = Object.entries(testTaskItemList)

      const result: JSX.Element[] = []
      allVacancies.forEach((vacancy) => {
        if (vacancy && vacancy[1] && vacancy[1].taskSets) {
          vacancy[1].taskSets.forEach((taskSet) => {
            result.push(
              <TestTaskPreview
                key={taskSet.id}
                id={taskSet.id}
                timeLimits={taskSet.timeLimits}
                countTask={[...(taskSet.progTasks || []), ...(taskSet.testTasks || [])].length}
                name={taskSet.name}
                startTest={startTest}
                vacancyId={vacancy[1].vacancyId}
              />
            )
          })
        }
      })
      return result
    }
  }, [testTaskItemList])

  return (
    <div className={classNames(cls.testTaskPack, {}, [className])}>
      <div className={classNames(cls.testTaskBrow, {}, ['Brow_card'])}>Тестовые задания</div>
      <div className={cls.testTaskList}>
        {testTaskListMemo && testTaskListMemo.length > 0 ? (
          testTaskListMemo
        ) : (
          <span style={{ textAlign: 'center' }}> Все задания выполнены! </span>
        )}
      </div>
    </div>
  )
}
