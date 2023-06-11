import React, { useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CreateAndEditCodeTask.module.scss'
import { Editor } from '@monaco-editor/react'

interface CodeEditorProps {
  className?: string
  onChange: (data: string) => void
  language: string
  code: string
  theme?: string
  defaultValue?: string
}

export const CodeEditor: React.FC<CodeEditorProps> = (props) => {
  const { className, onChange, language, code, theme, defaultValue = '' } = props
  const [value, setValue] = useState(code)

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setValue(value)
      onChange(value)
    }
  }

  useEffect(() => {
    setValue(code)
  }, [code])

  const options = {
    readOnly: false,
    minimap: { enabled: false },
    tabSize: 2,
    lineDecorationsWidth: 1,
    lineNumbersMinChars: 3,
    overviewRulerBorder: true,
    padding: { top: 10 },
  }

  return (
    <div className={cls.codeEditorWrap}>
      <Editor
        className={cls.codeEditor}
        height={'100%'}
        width={`100%`}
        language={language}
        value={value}
        theme={'light'}
        defaultValue={defaultValue}
        onChange={handleEditorChange}
        options={options}
      />
    </div>
  )
}
