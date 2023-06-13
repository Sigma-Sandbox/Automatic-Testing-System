import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CreateAndEditCodeTask.module.scss'
import { Modal } from 'shared/ui/Modal/Modal'
import { Condition, ProgTask } from 'entities/Candidate/TestTask'
import { ProgrammingLanguage } from 'core/enums'
import { Input } from 'shared/ui/Input/Input'
import { MySelect } from 'shared/ui/Select/Select'
import { CodeEditor } from './CodeEditor'
import { Button, ColorButton, SizeButton, ThemeButton } from 'shared/ui/Button/Button'
import checkSvg from 'shared/assets/icon/check.svg'
import { fetchCodeData } from '../model/sevice/fetchCodeData'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'app/providers/StoreProvider/config/store'
import { progTaskAdminActions } from 'entities/Admin/ProgTask'
import { toast } from 'react-toastify'

interface CreateAndEditCodeTaskProps {
  className?: string
  closeModal: () => void
  task: ProgTask | null
}

enum ActionCondType {
  language = 'language',
  maxTime = 'maxTime',
  maxMemory = 'maxMemory',
  codeExample = 'codeExample',
  autoTests = 'autoTests',
}
export const CreateAndEditCodeTask: React.FC<CreateAndEditCodeTaskProps> = (props) => {
  const { className = '', closeModal, task } = props

  const [nameTask, setNameTask] = useState<string>(task?.name || '')
  const [complexity, setComplexity] = useState<string>(
    task?.complexityAssessment ? `${task?.complexityAssessment}` : ''
  )
  const [descriptTask, setDescriptTask] = useState<string>(task?.description || '')
  const [conditions, setConditions] = useState<{ [key in ProgrammingLanguage]: Condition }>({
    [ProgrammingLanguage.Java]: {
      language: ProgrammingLanguage.Java,
      maxTime: 0,
      maxMemory: 0,
      codeExample: '',
      autoTests: '',
    },
    [ProgrammingLanguage.JavaScript]: {
      language: ProgrammingLanguage.JavaScript,
      maxTime: 0,
      maxMemory: 0,
      codeExample: '',
      autoTests: '',
    },
  })

  const [currentLang, setCurrentLang] = useState<ProgrammingLanguage>(ProgrammingLanguage.JavaScript)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const condObject: { [key in ProgrammingLanguage]: Condition } = conditions
    if (task) {
      task.conditions.forEach((cond) => (condObject[cond.language] = cond))
      setConditions({ ...condObject })
    }
  }, [])

  const checkAllField: boolean = useMemo(() => {
    if (nameTask.trim() === '' || descriptTask.trim() === '' || +complexity <= 0) {
      return false
    }
    const currentCond = conditions[currentLang]

    if (currentCond.autoTests.trim() === '' || currentCond.codeExample.trim() === '') {
      return false
    }

    if (currentCond.maxMemory <= 0 || currentCond.maxTime <= 0) {
      return false
    }

    return true
  }, [currentLang, conditions, nameTask, complexity, descriptTask])

  const changeNameTask = (newValue: string) => {
    setNameTask(newValue)
  }
  const changeComplexity = (newValue: string) => {
    setComplexity(newValue)
  }

  const changeCurrentLang = (newValue: null | string[] | string) => {
    if (!Array.isArray(newValue) && newValue !== null) {
      setCurrentLang(newValue as ProgrammingLanguage)
    }
  }

  const conditionMemo = useMemo(() => {
    return conditions[currentLang]
  }, [conditions, currentLang])

  const changeCond = (action: ActionCondType, value: string | number) => {
    switch (action) {
      case ActionCondType.codeExample:
        let newCondExample = conditions[currentLang]
        if (!newCondExample) return
        newCondExample = { ...newCondExample, codeExample: value + '' }
        setConditions({ ...conditions, [currentLang]: newCondExample })
        break
      case ActionCondType.maxMemory:
        let newCondMemory = conditions[currentLang]
        if (!newCondMemory) return
        newCondMemory = { ...newCondMemory, maxMemory: +value }
        setConditions({ ...conditions, [currentLang]: newCondMemory })
        break
      case ActionCondType.maxTime:
        let newCondTime = conditions[currentLang]
        if (!newCondTime) return
        newCondTime = { ...newCondTime, maxTime: +value }
        setConditions({ ...conditions, [currentLang]: newCondTime })
        break
      case ActionCondType.autoTests:
        let newCondTests = conditions[currentLang]
        if (!newCondTests) return
        newCondTests = { ...newCondTests, autoTests: value + '' }
        setConditions({ ...conditions, [currentLang]: newCondTests })
        break
    }
  }

  const notify = (text: string) => toast(text)
  const sendNewCodeTask = async () => {
    const newConditions = Object.values(conditions).filter((cond) => cond.autoTests !== '')
    const newCodeTask: ProgTask = {
      id: task?.id || +new Date(),
      name: nameTask,
      description: descriptTask,
      complexityAssessment: +complexity,
      conditions: newConditions,
    }
    const isAddCodeTask = task ? false : true
    const responseFetchStatus = await fetchCodeData(newCodeTask, isAddCodeTask)
    if (responseFetchStatus === 'OK') {
      if (isAddCodeTask) {
        // TODO: response id for local state
        notify('Задача добавлен')
        dispatch(progTaskAdminActions.setAddProgTask(newCodeTask))
      } else {
        notify('Задача обновлена')
        dispatch(progTaskAdminActions.setUpdateProgTask(newCodeTask))
      }
    } else {
      notify('Произошла ошибка')
    }
    closeModal()
  }

  return (
    <Modal closeModal={closeModal} className={classNames(cls.modal, {}, [cls.modalSpec])}>
      <div className={classNames(cls.createAndEditCodeTask, {}, [className])}>
        <Input className={cls.name} value={nameTask} onChange={changeNameTask} placeholder="Название задачи" />
        <div className={cls.descript}>
          Условие задачи:
          <textarea
            className={cls.descriptInput}
            value={descriptTask}
            onChange={(e) => setDescriptTask(e.target.value)}
          />
        </div>
        <div className={cls.selectLang}>
          Язык программирования:
          <MySelect
            options={[
              { label: ProgrammingLanguage.Java, value: ProgrammingLanguage.Java },
              { label: ProgrammingLanguage.JavaScript, value: ProgrammingLanguage.JavaScript },
            ]}
            changeSelect={changeCurrentLang}
            isClearable={false}
            selected={{ label: currentLang, value: currentLang }}
          ></MySelect>
          <div className={classNames(cls.checkField, { [cls.show]: checkAllField }, [])}>
            <img src={checkSvg} alt="check" />
          </div>
        </div>
        <div className={cls.example}>
          Пример работы кода:
          <CodeEditor
            onChange={(data: string) => changeCond(ActionCondType.codeExample, data)}
            language={currentLang}
            code={conditionMemo.codeExample}
            defaultValue="Пример работы кода"
          ></CodeEditor>
        </div>
        <div className={cls.limits}>
          <div>
            {' '}
            Ограничения: <br />
            <div className={cls.limitsWrap}>
              <div className={classNames(cls.limitTime, {}, [cls.condNumbers])}>
                Время:{' '}
                <Input
                  className={classNames('', {}, [cls.condNumbersInp])}
                  value={conditionMemo.maxTime + ''}
                  type="number"
                  onChange={(data: string) => changeCond(ActionCondType.maxTime, data)}
                  placeholder=""
                />
                мс
              </div>
              <div className={classNames(cls.limitMemory, {}, [cls.condNumbers])}>
                Память:{' '}
                <Input
                  className={classNames('', {}, [cls.condNumbersInp])}
                  value={conditionMemo.maxMemory + ''}
                  type="number"
                  onChange={(data: string) => changeCond(ActionCondType.maxMemory, data)}
                  placeholder=""
                />
                мб
              </div>
            </div>
          </div>
          <div className={classNames(cls.complexity, {}, [cls.condNumbers])}>
            Сложность:
            <Input
              className={classNames(cls.complexityInp, {}, [cls.condNumbersInp])}
              value={complexity}
              type="number"
              onChange={changeComplexity}
              placeholder="Кол-во баллов"
            />
          </div>
        </div>
        <div className={cls.autoTest}>
          Тестовые решения:
          <CodeEditor
            onChange={(data: string) => {
              changeCond(ActionCondType.autoTests, data)
            }}
            language={currentLang}
            code={conditionMemo.autoTests}
          ></CodeEditor>
        </div>

        <Button
          className={classNames(cls.btn, { [cls.hide]: !checkAllField }, [])}
          size={SizeButton.L}
          theme={ThemeButton.BACKGROUND}
          color={ColorButton.SECONDARY_COLOR}
          onClick={sendNewCodeTask}
        >
          Сохранить
        </Button>
      </div>
    </Modal>
  )
}
