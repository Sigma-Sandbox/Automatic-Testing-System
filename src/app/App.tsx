import React, { Suspense } from 'react'
import './index.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { LoginPage } from 'pages/LoginPage'
import { AppRouter } from './providers/router'
import { Loader } from 'shared/ui/Loader/Loader'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { TestPage } from 'pages/Candidate/TestPage'
import { useLocation } from 'react-router-dom'

function App() {
  //  const { pathname } = useLocation();

  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback={<Loader />}>
        <Sidebar></Sidebar>

        <div className="content-page">
          <Navbar></Navbar>
          <AppRouter></AppRouter>
        </div>
      </Suspense>
    </div>
  )
}

export default App
