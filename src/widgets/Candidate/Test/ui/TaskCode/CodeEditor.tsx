import React, { useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './TaskCode.module.scss'
import { Editor } from '@monaco-editor/react'

import { ActionTypeCode } from './TaskCode'

interface CodeEditorProps {
  className?: string
  onChange?: (action: ActionTypeCode, data: string) => void
  language: string
  code: string
  theme?: string
  readonly?: boolean
}

export const CodeEditor: React.FC<CodeEditorProps> = (props) => {
  const { className, onChange, language, code, theme, readonly = false } = props
  const [value, setValue] = useState(code || '')

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setValue(value)
      onChange && onChange(ActionTypeCode.CODE, value)
    }
  }

  useEffect(() => {
    if (code) {
      setValue(code)
    }
  }, [language, code])

  const options = {
    readOnly: readonly,
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
        language={language || 'javascript'}
        value={value}
        theme={'light'}
        defaultValue="// some comment"
        onChange={handleEditorChange}
        options={options}
      />
    </div>
  )
}
