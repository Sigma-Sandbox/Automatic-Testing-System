import React, {useMemo, useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './EditTaskSlide.module.scss'
import {ProgTask, TestTask} from 'entities/Candidate/TestTask'
import {TypeTaskInEdit} from '../MainEditTaskSet/MainEditTaskSet'
import {SearchField} from 'features/SearchAndFilterTab'
import {OneTask} from '../OneTask/OneTask'

interface EditTaskSlideProps {
  className?: string
  task: TypeTaskInEdit
  progTaskListInit: ProgTask[]
  testTaskListInit: TestTask[]
  index: number
  changeTaskSelect: (elem: ProgTask | TestTask, index: number) => void
}

export const EditTaskSlide: React.FC<EditTaskSlideProps> = (props) => {
  const {className = '', task, progTaskListInit, testTaskListInit, changeTaskSelect, index} = props

  const [progTaskList, setProgTaskList] = useState<ProgTask[]>(progTaskListInit)
  const [testTaskList, setTestTaskList] = useState<TestTask[]>(testTaskListInit)
  const [searchProg, setSearchProg] = useState('')
  const [searchTest, setSearchTest] = useState('')
  const [select, setSelect] = useState<TypeTaskInEdit>(task)

  const progTaskListMemo = useMemo(() => {
    // TODO FILTER
    return progTaskList.map((prog) => {
      return (
        <OneTask
          task={prog}
          select={select && 'conditions' in select && select.id === prog.id}
          index={index}
          changeTaskSelect={changeTaskSelect}
          handleBorder={setSelect}
        />
      )
    })
  }, [searchProg, progTaskListInit, select])

  const testTaskListMemo = useMemo(() => {
    // TODO FILTER
    return testTaskList.map((test) => (
      <OneTask
        task={test}
        index={index}
        select={select && 'questions' in select && select.id === test.id}
        changeTaskSelect={changeTaskSelect}
        handleBorder={setSelect}
      />
    ))
  }, [searchTest, testTaskListInit, select])

  return (
    <div className={cls.container}>
      <div className={classNames(cls.editTaskSlide, {}, [className])}>
        <div className={classNames(cls.sideList, {}, [cls.testTask])}>
          <SearchField value={searchTest} onChange={(text) => setSearchTest(text)} />
          {testTaskListMemo}
        </div>

        <div className={classNames(cls.sideList, {}, [cls.progTask])}>
          <SearchField value={searchProg} onChange={(text) => setSearchProg(text)} />
          {progTaskListMemo}
        </div>
      </div>
    </div>
  )
}
