import React, { useEffect, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './EditTaskSlide.module.scss'
import { ProgTask, TestTask } from 'entities/Candidate/TestTask'
import { TypeTaskInEdit } from '../MainEditTaskSet/MainEditTaskSet'
import { SearchField } from 'features/SearchAndFilterTab'
import { OneTask } from '../OneTask/OneTask'
import { Button, ColorButton, SizeButton, ThemeButton } from 'shared/ui/Button/Button'

interface EditTaskSlideProps {
  className?: string
  task: TypeTaskInEdit
  progTaskListInit: ProgTask[]
  testTaskListInit: TestTask[]
  index: number
  changeTaskSelect: (elem: ProgTask | TestTask, index: number) => void
  handleDeleteTask: (index: number) => void
}

export const EditTaskSlide: React.FC<EditTaskSlideProps> = (props) => {
  const { className = '', task, progTaskListInit, testTaskListInit, changeTaskSelect, index, handleDeleteTask } = props

  const [progTaskList, setProgTaskList] = useState<ProgTask[]>(progTaskListInit)
  const [testTaskList, setTestTaskList] = useState<TestTask[]>(testTaskListInit)
  const [searchProg, setSearchProg] = useState('')
  const [searchTest, setSearchTest] = useState('')
  const [select, setSelect] = useState<TypeTaskInEdit>(task)

  useEffect(() => {
    setSelect(task)
  }, [task])

  const progTaskListMemo = useMemo(() => {
    // TODO FILTER
    if (searchProg === '') {
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
    } else {
      const filterprogTaskList = progTaskList.filter(
        (el) => el.name.includes(searchProg) || el.description.includes(searchProg)
      )
      return filterprogTaskList.map((prog) => {
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
    }
  }, [searchProg, progTaskListInit, select])

  const testTaskListMemo = useMemo(() => {
    // TODO FILTER
    if (searchTest === '') {
      return testTaskList.map((test) => (
        <OneTask
          task={test}
          index={index}
          select={select && 'questions' in select && select.id === test.id}
          changeTaskSelect={changeTaskSelect}
          handleBorder={setSelect}
        />
      ))
    } else {
      const filterTestTaskList = testTaskList.filter(
        (el) =>
          el.description.includes(searchTest) ||
          el.name.includes(searchTest) ||
          el.questions.find(
            (q) =>
              q.description.includes(searchTest) ||
              q.correctAnswers.join(' ').includes(searchTest) ||
              q.wrongAnswers.join(' ').includes(searchTest)
          )
      )

      return filterTestTaskList.map((test) => (
        <OneTask
          task={test}
          index={index}
          select={select && 'questions' in select && select.id === test.id}
          changeTaskSelect={changeTaskSelect}
          handleBorder={setSelect}
        />
      ))
    }
  }, [searchTest, testTaskListInit, select])

  return (
    <div className={cls.container}>
      <div className={classNames(cls.editTaskSlide, {}, [className])}>
        <div className={classNames(cls.sideList, {}, [cls.testTask, 'custom_scroll'])}>
          <SearchField value={searchTest} onChange={(text) => setSearchTest(text)} />
          {testTaskListMemo}
        </div>

        <div className={classNames(cls.sideList, {}, [cls.progTask, 'custom_scroll'])}>
          <SearchField value={searchProg} onChange={(text) => setSearchProg(text)} />
          {progTaskListMemo}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <Button
          size={SizeButton.XL}
          theme={ThemeButton.CLEAR}
          color={ColorButton.RED_COLOR}
          style={{ padding: 5 }}
          onClick={() => handleDeleteTask(index)}
        >
          Убрать задачу из набора
        </Button>
      </div>
    </div>
  )
}
