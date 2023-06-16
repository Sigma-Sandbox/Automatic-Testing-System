import React, { useEffect, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CreateAndEditTestTask.module.scss'
import { Modal } from 'shared/ui/Modal/Modal'
import { Button, ColorButton, SizeButton } from 'shared/ui/Button/Button'
import { TestTaskStart } from './TestTaskStart'
import { TestQuestion, TestTask } from 'entities/Candidate/TestTask'
import { TestTaskItem } from './TestTaskItem'

import plusImg from 'shared/assets/icon/plus.svg'
import { fetchTestTaskForm } from '../model/service/fetchTestTaskForm'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'app/providers/StoreProvider/config/store'
import { testTaskAdminActions } from 'entities/Admin/TestTask'
import { toast } from 'react-toastify'

interface CreateAndEditTestTaskProps {
  className?: string
  closeModal: () => void
  test: TestTask | null
}

export interface infoTestTask {
  name: string
  description: string
  execTime: number | string
}

export const CreateAndEditTestTask: React.FC<CreateAndEditTestTaskProps> = (props) => {
  const { className = '', closeModal, test } = props
  const [info, setInfo] = useState<infoTestTask>({
    name: test?.name || '',
    execTime: test?.execTime || '',
    description: test?.description || '',
  })
  const [questions, setQuestions] = useState<(TestQuestion | null)[]>(test?.questions || [null])
  const [currentItem, setCurrentItem] = useState<number>(0)

  const dispatch = useDispatch<AppDispatch>()

  const isEmptyField = useMemo(() => {
    return info.name === '' || questions.includes(null)
  }, [info, questions])
  const addQuestion = () => {
    const newQuestions = [...questions]
    newQuestions.push(null)
    setQuestions(newQuestions)
    setCurrentItem(newQuestions.length)
  }
  const changeQuestion = (question: TestQuestion | null) => {
    const newQuestions = [...questions]

    newQuestions[currentItem - 1] = question
    setQuestions(newQuestions)
  }

  const deleteQuestion = () => {
    const newQuestions = [...questions]

    newQuestions.splice(currentItem - 1, 1)
    if (currentItem > newQuestions.length) {
      setCurrentItem(newQuestions.length)
    }

    setQuestions(newQuestions)
  }
  const navbarItems = useMemo(() => {
    const items: JSX.Element[] = []

    for (let i = 0; i <= questions.length; i++) {
      items.push(
        <Button
          className={classNames(cls.btnNavbar, { [cls.select]: currentItem === i }, [cls.spec])}
          style={{ transform: `translateX(calc(275px + -${currentItem * 55}px))` }}
          onClick={() => setCurrentItem(+i)}
          color={ColorButton.BACKGROUND_COLOR}
          key={'navbar items' + i}
        >
          {i}
        </Button>
      )
    }
    items.push(
      <Button
        className={classNames(cls.btnNavbar, { [cls.hide]: questions.includes(null) }, [cls.spec, cls.btnPlus])}
        style={{ transform: `translateX(calc(275px + -${currentItem * 55}px))` }}
        onClick={addQuestion}
        color={ColorButton.BACKGROUND_COLOR}
        key={'navbar items' + questions.length + 2}
      >
        <img src={plusImg} alt="plus" />
      </Button>
    )

    return items
  }, [currentItem, questions])

  const handlerInfo = (action: string, value: string) => {
    switch (action) {
      case 'name':
        setInfo({ ...info, name: value })
        break
      case 'execTime':
        setInfo({ ...info, execTime: value })
        break
      case 'description':
        setInfo({ ...info, description: value })
        break
    }
  }

  const sendNewTestTask = async () => {
    const newQuestions: TestQuestion[] = []
    questions.forEach((el) => {
      if (el) {
        newQuestions.push(el)
      }
    })
    const newTestTask: TestTask = {
      id: test?.id || -10,
      questions: newQuestions,
      description: info.description,
      name: info.name,
      execTime: +info.execTime,
    }

    const isAddTestTask = test ? false : true
    const responseFetchStatus = await fetchTestTaskForm(newTestTask, isAddTestTask)
    if (responseFetchStatus === 'OK') {
      if (isAddTestTask) {
        // TODO: response id for local state
        notify('Тест добавлен')
        dispatch(testTaskAdminActions.setAddTest(newTestTask))
      } else {
        notify('Тест обновлен')
        dispatch(testTaskAdminActions.setUpdateTest(newTestTask))
      }
    } else {
      notify('Произошла ошибка')
    }
    closeModal()
  }

  const notify = (text: string) => toast(text)
  return (
    <Modal closeModal={closeModal} className={classNames(cls.modal, {}, [cls.modalSpec])}>
      <div className={classNames(cls.createAndEditTestTask, {}, [className])}>
        <div className={classNames(cls.content)}>
          <div className={classNames(cls.contentItem)} style={{ transform: `translateX(calc(-${currentItem * 100}%)` }}>
            <TestTaskStart nextTask={() => setCurrentItem(1)} info={info} handlerInfo={handlerInfo}></TestTaskStart>
          </div>
          {questions.map((question, index) => {
            return (
              <div
                className={classNames(cls.contentItem)}
                style={{ transform: `translateX(calc(-${currentItem * 100}%)` }}
                key={`${index} ${question?.id}`}
              >
                <TestTaskItem
                  // key={question?.id || 'null ' + index}
                  deleteQuestion={index === 0 && questions.length === 1 ? null : deleteQuestion}
                  changeQuestion={changeQuestion}
                  question={question}
                />
              </div>
            )
          })}
        </div>
        <div className={classNames(cls.navbar)}>{navbarItems}</div>
        <Button
          className={classNames(cls.saveBtn, { [cls.hide]: isEmptyField }, [])}
          size={SizeButton.L}
          color={ColorButton.SECONDARY_COLOR}
          onClick={sendNewTestTask}
        >
          Сохранить
        </Button>
      </div>
    </Modal>
  )
}
