import React, { useEffect, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './QuestionCreator.module.scss'
import { Modal } from 'shared/ui/Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestions, testTaskAdminActions } from 'entities/Admin/TestTask'
import { TestQuestion } from 'entities/Candidate/TestTask'
import { MySelect } from 'shared/ui/Select/Select'
import { fetchQuestions } from 'features/CreateAndEditTestTask/model/service/fetchQuestions'
import { Button, ColorButton, SizeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'

interface QuestionCreatorProps {
  className?: string
  closeModal: () => void
}

export const QuestionCreator: React.FC<QuestionCreatorProps> = (props) => {
  const { className = '', closeModal } = props

  const allQuestions = useSelector(getQuestions)
  const dispath = useDispatch()
  const [selectQuestion, setSelectQuestion] = useState<string>('')
  const [isDelete, setIsDelete] = useState<boolean>(false)

  const [currentQuestion, setCurrentQuestion] = useState<TestQuestion | null>(null)

  const changeCurrrentQuestion = useMemo(() => {
    const newCurrentQuest = allQuestions.find((el) => el.description === selectQuestion) || null
    setCurrentQuestion(newCurrentQuest)
  }, [selectQuestion, allQuestions])

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

  const sendNewQuestion = () => {}
  return (
    <Modal closeModal={closeModal} className={cls.modal}>
      <div className={classNames(cls.questionCreator, {}, [className])}>
        <MySelect
          isMulti={false}
          className={cls.testQuestionSelect}
          placeHolder="Выберите вопрос"
          changeSelect={(el) => !Array.isArray(el) && setSelectQuestion(el || '')}
          styleSingleValue={{ whiteSpace: 'normal' }}
          styleMenuList={{ maxHeight: '250px' }}
          selected={
            selectQuestion !== ''
              ? {
                  value: selectQuestion,
                  label: selectQuestion,
                }
              : null
          }
          options={allQuestions.map((question) => {
            return { label: question.description, value: question.description }
          })}
        ></MySelect>

        <div className={cls.answers}>
          <ul className={classNames(cls.answersList, { [cls.delMarker]: currentQuestion !== null }, [])}>
            {currentQuestion?.correctAnswers.map((ans) => (
              <li key={ans} className={cls.correctAns}>
                <Input className={cls.questionInp} value={ans}></Input>
              </li>
            ))}
            {currentQuestion?.wrongAnswers.map((ans) => (
              <li key={ans} className={cls.wrongAns}>
                <Input className={cls.questionInp} value={ans}></Input>
              </li>
            ))}
            {currentQuestion === null && (
              <>
                <li key={1} className={cls.emptyAns}>
                  <Input className={cls.questionInp} value={''} placeholder="Вариант ответа"></Input>
                </li>
                <li key={2} className={cls.emptyAns}>
                  <Input className={cls.questionInp} value={''} placeholder="Вариант ответа"></Input>
                </li>
                <li key={3} className={cls.emptyAns}>
                  <Input className={cls.questionInp} value={''} placeholder="Вариант ответа"></Input>
                </li>
                <li key={4} className={cls.emptyAns}>
                  <Input className={cls.questionInp} value={''} placeholder="Вариант ответа"></Input>
                </li>
              </>
            )}
          </ul>
        </div>
        <Button
          className={classNames(cls.saveBtn, { [cls.hide]: false }, [])}
          size={SizeButton.L}
          color={ColorButton.SECONDARY_COLOR}
          onClick={sendNewQuestion}
        >
          Сохранить
        </Button>
      </div>
    </Modal>
  )
}
