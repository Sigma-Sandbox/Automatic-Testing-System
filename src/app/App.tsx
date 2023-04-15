import React from 'react'
import './index.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { LoginPage } from 'pages/LoginPage'
import { AppRouter } from './providers/router'

function App() {
  return (
    <div className={classNames('app', {}, [])}>
      <AppRouter></AppRouter>
    </div>
  )
}

export default App
