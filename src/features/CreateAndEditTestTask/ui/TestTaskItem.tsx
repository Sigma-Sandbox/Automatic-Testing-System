import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CreateAndEditTestTask.module.scss'
import { TestQuestion } from 'entities/Candidate/TestTask'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestions, testTaskAdminActions } from 'entities/Admin/TestTask'
import { fetchQuestions } from '../model/service/fetchQuestions'
import { MySelect } from 'shared/ui/Select/Select'
import { Button, ColorButton } from 'shared/ui/Button/Button'

import crossImg from 'shared/assets/icon/icons8-close-16.png'

interface TestTaskItemProps {
  className?: string
  question: TestQuestion | null
  changeQuestion: (question: TestQuestion | null) => void
  deleteQuestion: null | (() => void)
}

export const TestTaskItem: React.FC<TestTaskItemProps> = (props) => {
  const { className = '', question, changeQuestion, deleteQuestion } = props

  const allQuestions = useSelector(getQuestions)
  const dispath = useDispatch()
  const [selectQuestion, setSelectQuestion] = useState<string>(question?.description ? question.description : '')
  const [isDelete, setIsDelete] = useState<boolean>(false)

  const [currentQuestion, setCurrentQuestion] = useState<TestQuestion | null>(question || null)

  const changeCurrrentQuestion = useMemo(() => {
    const newCurrentQuest = allQuestions.find((el) => el.description === selectQuestion) || null
    setCurrentQuestion(newCurrentQuest)
  }, [selectQuestion, allQuestions])

  useEffect(() => {
    changeQuestion(currentQuestion)
  }, [currentQuestion])

  useEffect(() => {
    if (allQuestions.length === 0) {
      sendQueryQuestions()
    }
  }, [])

  const sendQueryQuestions = async () => {
    const response = await fetchQuestions({})
    if (response) {
      dispath(testTaskAdminActions.setQusetions(response))
    } else {
      console.log('Не удалось получить список вопросов')
    }
  }

  const handlerDelBtn = useCallback(() => {
    if (deleteQuestion) {
      setIsDelete(true)
      setTimeout(deleteQuestion, 300)
    }
  }, [deleteQuestion])

  return (
    <div className={classNames(cls.testTaskItem, { [cls.delete]: isDelete }, [className])}>
      <Button
        className={classNames(cls.btnDel, { [cls.hide]: deleteQuestion === null })}
        onClick={handlerDelBtn}
        color={ColorButton.RED_COLOR}
      >
        <img src={crossImg} alt="cross" />
      </Button>
      <MySelect
        isMulti={false}
        className={cls.testQuestionSelect}
        placeHolder="Выберите вопрос"
        changeSelect={(el) => !Array.isArray(el) && setSelectQuestion(el || '')}
        styleSingleValue={{ whiteSpace: 'normal' }}
        styleMenuList={{ maxHeight: '250px' }}
        selected={{
          value: selectQuestion,
          label: selectQuestion,
        }}
        options={allQuestions.map((question) => {
          return { label: question.description, value: question.description }
        })}
      ></MySelect>

      <div className={cls.answers}>
        <ul className={cls.answersList}>
          {currentQuestion?.correctAnswers.map((ans) => (
            <li key={ans} className={cls.correctAns}>
              {ans}
            </li>
          ))}
          {currentQuestion?.wrongAnswers.map((ans) => (
            <li key={ans} className={cls.wrongAns}>
              {ans}
            </li>
          ))}
          {currentQuestion === null && (
            <>
              <li key={'null list ' + 1} className={cls.emptyAns}></li>
              <li key={'null list ' + 2} className={cls.emptyAns}></li>
              <li key={'null list ' + 3} className={cls.emptyAns}></li>
              <li key={'null list ' + 4} className={cls.emptyAns}></li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
