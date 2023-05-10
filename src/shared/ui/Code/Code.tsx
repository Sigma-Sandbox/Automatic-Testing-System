import React, {useEffect} from 'react'
import hljs from 'highlight.js'
import hljsNumLine from 'highlightjs-line-numbers.js'
import javascript from 'highlight.js/lib/languages/javascript'
import java from 'highlight.js/lib/languages/java'

import 'highlight.js/styles/github.css'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Code.module.scss'

import {Editor} from '@monaco-editor/react'

interface CodeProps {
  code: string
  language: string
}

export const Code: React.FC<CodeProps> = (props) => {
  const {code, language = 'javascript'} = props

  useEffect(() => {
    hljs.registerLanguage('javascript', javascript)
    hljs.registerLanguage('java', java)
    hljs.highlightAll()
    // // @ts-ignore
    // hljs.initLineNumbersOnLoad()
    // console.log(hljsNumLine, hljs)
  }, [])

  return (
    <div className='code'>
      <pre>
        <code className={classNames(cls.code, {}, [`language-${language}`, 'hljs'])}>{code}</code>
      </pre>
    </div>
  )
}
