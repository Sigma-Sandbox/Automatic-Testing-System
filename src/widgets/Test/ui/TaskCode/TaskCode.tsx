import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TaskCode.module.scss'
import { ProgTask } from 'entities/TestTask'
import { Code } from 'shared/ui/Code/Code'
import { CodeEditor } from './CodeEditor'
import { Language, languageOptions } from 'widgets/Test/model/const/testConst'
import monacoThemes from 'monaco-themes/themes/themelist.json'
import axios from 'axios'
import LanguageSelector from '../LanguageSelector'
import { SingleValue } from 'react-select'
import { UserSolution, WithNumOfTry, WithVacancyId } from 'core/entities'
import { TaskResult, TaskType } from 'core/enums'

interface TaskCodeProps {
  className?: string
  dataItem: WithVacancyId<WithNumOfTry<ProgTask>>
}

export enum ActionTypeCode {
  CODE = 'code',
}

export const TaskCode: React.FC<TaskCodeProps> = (props) => {
  const className = props.className || ''
  const {id, description, name, condition, complexityAssessment, numOfTry, vacancyId} = props.dataItem
  const examples = condition[0].codeExample
  const [code, setCode] = useState(condition[0].codeExample || '')
  const [outputDetails, setOutputDetails]: any = useState(undefined)
  const [language, setLanguage] = useState(languageOptions.find(l => l.value === condition[0].language)!)
  const [processing, setProcessing] = useState(false)
  const [maxTimeExecution, setMaxTimeExecution] = useState(condition[0].maxTime)
  const [maxMemoryExecution, setMaxMemoryExecution] = useState(condition[0].maxMemory)

  const onSelectChange = (language: SingleValue<Language>) => {
    setLanguage(language as Language)
    if (language) {
      const cond = condition.find(c => c.language === language.value)
      if (cond) {
        setMaxTimeExecution(cond.maxTime)
        setMaxMemoryExecution(cond.maxMemory)
        setCode(cond.codeExample)
      }
    }
  }

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

  const handleCompile = () => {
    setProcessing(true)
    const newCode = `${code}`

    try {
      btoa(newCode)
    } catch {
      setProcessing(false)
      throw new Error(`Используйте только латинские символы, цифры и спец. символы!`)
    }

    const formData = {
      language_id: language.id,
      source_code: btoa(newCode),
      stdin: btoa(''),
      // expected_output: `Hello, world!`
    }

    const options = {
      method: "POST",
      url: "http://localhost:2358/submissions/",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
      },
      data: formData,
    }

    axios
      .request(options)
      .then((response) => {
        const token = response.data.token
        checkStatus(token)
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err
        let status = err.response.status
        console.log("status", status)
        setProcessing(false)
        console.log("catch block...", error)
      })
  }

  const checkStatus = async (token: any) => {
    const options = {
      method: "GET",
      url: "http://localhost:2358/submissions/" + token,
      params: { base64_encoded: "true", fields: "*" },
    }

    let response = await axios.request(options)
    // FIXME: userId, execStartTime, taskSetId поправить на нужные
    let userSolution: UserSolution = {
      taskId: id,
      numOfTry: numOfTry,
      userId: 1,
      vacancyId: vacancyId,
      execStartTime: Date.now() - 1000,
      execEndTime: Date.now(),
      programCode: code,
      progTaskMemory: response.data.memory,
      progTaskTime: response.data.wall_time,
      taskSetId: 1,
      taskType: TaskType.PROG_TASK,
      result: TaskResult.FAIL
    }

    try {
      let statusId = response.data.status?.id

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        userSolution = {
          ...userSolution,
          result: TaskResult.DONE
        }
        setOutputDetails(response.data)
        console.log("response.data", response.data)
        postUserSolutionProg(userSolution)
        setProcessing(false)
        return
      }
    } catch (err) {
      console.log("err", err)
      setProcessing(false)
      postUserSolutionProg(userSolution)
    }
  }

  const getOutput = () => {
    if (!outputDetails) {
      return ''
    }

    let statusId = outputDetails.status?.id

    if (statusId === 6) {
      return atob(outputDetails.compile_output)
    } else if (statusId === 3) {
      return atob(outputDetails.stdout) !== null ? `${atob(outputDetails.stdout)}` : null
    } else if (statusId === 5) {
      return `Time Limit Exceeded`
    } else if (statusId === 4) {
      return `${outputDetails.status.description}: 
              Your Answer: ${atob(outputDetails.stdout)}, 
              Expected: ${outputDetails.expected_output}`
    } else {
      return atob(outputDetails.stderr)
    }
  }

  const postUserSolutionProg = async (solution: UserSolution) => {
    fetch('api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(solution),
    })
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
              <Code code={examples || ''} language={language.value}/>
            </div>
            <div className={classNames(cls.descripCond, {}, [])}>
              Ограничения:
              <ul className={classNames(cls.descripCondList, {}, [])}>
                <li>{`Ограничение по времени: ${maxTimeExecution} с`}</li>
                <li>{`Ограничение по памяти: ${maxMemoryExecution} МБ`}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={classNames(cls.code, {}, [])}>
          <div className={classNames(cls.codeRedact, {}, [])}>
            <div className={classNames(cls.topPanel, {}, [])}>
              <span className={cls.codeName}>Решение</span>
              <div className={classNames(cls.languageSelector, {}, [])}>
                <LanguageSelector languages={condition} onSelectChange={onSelectChange} />
              </div>
              <button className={classNames(cls.execute, {}, [])} onClick={handleCompile}>
                {processing ? "Processing..." : "Compile and Execute"}
              </button>
            </div>
            <CodeEditor
              code={examples || ''}
              onChange={onChange}
              language={language.value}
              theme={monacoThemes['github-light']}
            />
          </div>
          <div className={classNames(cls.codeResult, {}, [])}>
            <span className={cls.codeName}>Результат</span>
            <div style={{padding: '10px'}}>{getOutput()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
