import React, {Suspense} from 'react'
import './index.scss'
import {classNames} from 'shared/lib/classNames/classNames'
import {LoginPage} from 'pages/LoginPage'
import {AppRouter} from './providers/router'
import {Loader} from 'shared/ui/Loader/Loader'
import {Navbar} from 'widgets/Navbar'
import {Sidebar} from 'widgets/Sidebar'
import {TestPage} from 'pages/TestPage'

function App() {
  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback={<Loader />}>
        <Sidebar></Sidebar>

        <div className='content-page'>
          <Navbar></Navbar>
          <AppRouter></AppRouter>
        </div>
      </Suspense>
    </div>
  )
}

export default App
