import React, { useEffect, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './QuestionCreator.module.scss'
import { Modal } from 'shared/ui/Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestions, testTaskAdminActions } from 'entities/Admin/TestTask'
import { TestQuestion } from 'entities/Candidate/TestTask'
import { MySelect } from 'shared/ui/Select/Select'
import { fetchNewQuestion, fetchQuestions } from 'features/CreateAndEditTestTask/model/service/fetchQuestions'
import { Button, ColorButton, SizeButton, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'

import CheckImg from 'shared/assets/icon/check.svg'
import CrossImg from 'shared/assets/icon/cross.svg'
import PlusImg from 'shared/assets/icon/plusWhite.png'
import { AppDispatch } from 'app/providers/StoreProvider/config/store'
import { toast } from 'react-toastify'

interface QuestionCreatorProps {
  className?: string
  closeModal: () => void
}

interface IAnswerInps {
  value: string
  isRight: boolean
}

enum ActionAnswerChange {
  VALUE = 'value',
  IS_RIGHT = 'isRight',
  DEL = 'del',
}

export const QuestionCreator: React.FC<QuestionCreatorProps> = (props) => {
  const { className = '', closeModal } = props

  const allQuestions = useSelector(getQuestions)
  const dispath = useDispatch()
  const [selectQuestion, setSelectQuestion] = useState<string>('')
  const [isDelete, setIsDelete] = useState<boolean>(false)

  const [currentQuestion, setCurrentQuestion] = useState<TestQuestion | null>(null)

  const [newDescript, setNewDescript] = useState<string>('')
  const [answerInps, setAnswersInps] = useState<{ [key: number]: IAnswerInps }>({})

  const dispatch = useDispatch<AppDispatch>()

  const changeCurrrentQuestion = useMemo(() => {
    const newCurrentQuest = allQuestions.find((el) => el.description === selectQuestion) || null
    setCurrentQuestion(newCurrentQuest)
  }, [selectQuestion, allQuestions])

  useEffect(() => {
    if (allQuestions.length === 0) {
      sendQueryQuestions()
    }
  }, [])

  useEffect(() => {
    setNewDescript(currentQuestion?.description || '')
  }, [currentQuestion])

  useEffect(() => {
    if (currentQuestion) {
      const newAnswersInps: IAnswerInps[] = []
      currentQuestion.correctAnswers.forEach((el) => newAnswersInps.push({ value: el, isRight: true }))
      currentQuestion.wrongAnswers.forEach((el) => newAnswersInps.push({ value: el, isRight: false }))

      setAnswersInps({ ...newAnswersInps })
    } else {
      setAnswersInps({
        0: { value: '', isRight: true },
        1: { value: '', isRight: false },
        2: { value: '', isRight: false },
        3: { value: '', isRight: false },
      })
    }
  }, [currentQuestion])

  const sendQueryQuestions = async () => {
    const response = await fetchQuestions({})
    if (response) {
      dispath(testTaskAdminActions.setQusetions(response))
    } else {
      console.log('Не удалось получить список вопросов')
    }
  }

  const addAnswerInp = () => {
    const newIndex = Object.values(answerInps).length

    setAnswersInps({ ...answerInps, [newIndex]: { isRight: false, value: '' } })
  }

  const changeAnswersInps = (changeValue: ActionAnswerChange, index: number, newValue?: string) => {
    const newAnswerObj = answerInps[index]

    switch (changeValue) {
      case ActionAnswerChange.VALUE:
        if (newValue !== undefined) {
          newAnswerObj.value = newValue
        }
        setAnswersInps({ ...answerInps, [index]: newAnswerObj })
        break
      case ActionAnswerChange.IS_RIGHT:
        newAnswerObj.isRight = !newAnswerObj.isRight
        setAnswersInps({ ...answerInps, [index]: newAnswerObj })
        break
      case ActionAnswerChange.DEL:
        const newObj = answerInps
        delete newObj[index]

        setAnswersInps({ ...newObj })
        break
    }
  }
  const sendNewQuestion = async () => {
    const wrongAns: string[] = []
    const rightAns: string[] = []

    Object.values(answerInps).forEach((ans) => {
      if (ans.isRight) {
        rightAns.push(ans.value)
      } else {
        wrongAns.push(ans.value)
      }
    })

    const newQuestions: TestQuestion = {
      id: currentQuestion?.id || -10,
      points: 1,
      wrongAnswers: wrongAns,
      correctAnswers: rightAns,
      description: newDescript,
    }
    const isAddTestTask = selectQuestion ? false : true
    const responseFetchStatus = await fetchNewQuestion(newQuestions, isAddTestTask)
    if (responseFetchStatus === 'OK') {
      if (isAddTestTask) {
        // TODO: response id for local state
        notify('Вопрос добавлен')
        dispatch(testTaskAdminActions.setAddQusetions(newQuestions))
      } else {
        notify('Вопрос обновлен')
        dispatch(testTaskAdminActions.setUpdateQusetions(newQuestions))
      }
    } else {
      notify('Произошла ошибка')
    }
    closeModal()
  }
  const notify = (text: string) => toast(text)
  return (
    <Modal closeModal={closeModal} className={cls.modal}>
      <div className={classNames(cls.questionCreator, {}, [className])}>
        <MySelect
          isMulti={false}
          className={cls.testQuestionSelect}
          placeHolder="Редактировать вопрос"
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
        <Input
          className={cls.newDescrpt}
          placeholder="Новый вопрос"
          value={newDescript}
          onChange={(value) => setNewDescript(value)}
        />
        <div className={cls.answers}>
          <ul className={classNames(cls.answersList, { [cls.delMarker]: currentQuestion !== null }, ['custom_scroll'])}>
            {Object.entries(answerInps).map((el) => (
              <li key={'inpt ' + el[0]} className={classNames(cls.emptyAns, {}, [cls.answerItem])}>
                <Button
                  className={classNames(cls.btnChangeRight)}
                  theme={ThemeButton.CLEAR}
                  color={ColorButton.TRANSPARENT}
                  onClick={() => changeAnswersInps(ActionAnswerChange.IS_RIGHT, +el[0])}
                >
                  <img className={classNames(cls.iconImg, { [cls.cross]: !el[1].isRight }, [])} src={CheckImg} alt="" />
                </Button>
                <Input
                  className={cls.questionInp}
                  placeholder="Вариант ответа"
                  value={el[1].value}
                  onChange={(value) => changeAnswersInps(ActionAnswerChange.VALUE, +el[0], value)}
                />
                <Button
                  className={classNames(cls.btnDelete, { [cls.hide]: Object.values(answerInps).length <= 2 })}
                  theme={ThemeButton.CLEAR}
                  color={ColorButton.TRANSPARENT}
                  onClick={() => changeAnswersInps(ActionAnswerChange.DEL, +el[0])}
                >
                  <img className={classNames(cls.iconDel, {}, [])} src={CrossImg} alt="" />
                </Button>
              </li>
            ))}

            {/* {currentQuestion === null && (
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
            )} */}
          </ul>
          <Button
            onClick={addAnswerInp}
            theme={ThemeButton.CLEAR}
            color={ColorButton.PRIMARY_COLOR}
            className={cls.btnPlus}
          >
            <img src={PlusImg} alt="" />
          </Button>
        </div>
        <Button
          className={classNames(
            cls.saveBtn,
            { [cls.hide]: Object.values(answerInps).some((el) => el.value.length === 0) || newDescript === '' },
            []
          )}
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
