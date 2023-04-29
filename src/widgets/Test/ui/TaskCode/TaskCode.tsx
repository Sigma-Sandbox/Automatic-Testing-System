import React, {useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './TaskCode.module.scss'
import {TestTaskCode} from 'entities/TestTask'
import {Code} from 'shared/ui/Code/Code'
import {CodeEditor} from './CodeEditor'
import {languageOptions} from 'widgets/Test/model/const/testConst'
import monacoThemes from 'monaco-themes/themes/themelist.json'

interface TaskCodeProps {
  className?: string
  dataItem: TestTaskCode
}

export enum ActionTypeCode {
  CODE = 'code',
}

export const TaskCode: React.FC<TaskCodeProps> = (props) => {
  const className = props.className || ''
  const {id, description, name, examples, condition, complexityAssessment} = props.dataItem
  const [code, setCode] = useState(examples || '')
  const [language, setLanguage] = useState(languageOptions[0])

  const onChange = (action: ActionTypeCode, data: string) => {
    switch (action) {
      case ActionTypeCode.CODE: {
        setCode(data)
        break
      }
      default: {
        console.warn('case not handled!', action, data)
      }
    }
  }

  return (
    <div className={classNames(cls.taskCode, {}, [className])}>
      <div className={classNames(cls.wrap, {}, [])}>
        <div className={classNames(cls.text, {}, [])}>
          <div className={classNames(cls.taskNum, {}, [])}></div>
          <div className={classNames(cls.descrip, {}, [])}>
            <div className={classNames(cls.descripName, {}, [])}>{name}</div>
            <div className={classNames(cls.descripComplexity, {}, [])}>Количество баллов: {complexityAssessment}</div>

            <div className={classNames(cls.descripText, {}, [])}>{description}</div>
            <div className={classNames(cls.descripExample, {}, [])}>
              <Code code={examples || ''} language='javascript' />
            </div>
            <div className={classNames(cls.descripCond, {}, [])}>
              Ограничения:
              <ul className={classNames(cls.descripCondList, {}, [])}>
                {condition.map((el) => (
                  <li>{el}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={classNames(cls.code, {}, [])}>
          <div className={classNames(cls.codeRedact, {}, [])}>
            <span className={cls.codeName}>Решение</span>
            <CodeEditor
              code={examples || ''}
              onChange={onChange}
              language={language?.value}
              theme={monacoThemes['github-light']}
            />
          </div>
          <div className={classNames(cls.codeResult, {}, [])}>
            <span className={cls.codeName}>Результат</span>
          </div>
        </div>
      </div>
    </div>
  )
}
