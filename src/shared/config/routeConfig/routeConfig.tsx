import {LoginPage} from 'pages/LoginPage'
import {MainPage} from 'pages/Candidate/MainPage'
import {TestPage} from 'pages/Candidate/TestPage'
import {Navigate, RouteProps} from 'react-router-dom'
import {AdminMainPage} from 'pages/Admin/AdminMainPage'
import {AdminTaskSetsPage} from 'pages/Admin/AdminTaskSetsPage'
import {VacancyPage} from 'pages/Admin/VacancyPage'

export enum AppRoutesCandidate {
  LOGIN = 'login',
  CANDIDATE_MAIN = 'main',
  DEFAULT = 'default',
  CANDIDATE_TEST = 'test',
}

export enum AppRoutesAdmin {
  LOGIN = 'login',
  MAIN = 'main',
  DEFAULT = 'default',
  TASK_SET = 'tests',
  VACANCY = 'vacancy',
}

export const RoutePathCandidate: Record<AppRoutesCandidate, string> = {
  [AppRoutesCandidate.CANDIDATE_MAIN]: '/main',
  [AppRoutesCandidate.LOGIN]: '/login',
  [AppRoutesCandidate.DEFAULT]: '*',
  [AppRoutesCandidate.CANDIDATE_TEST]: '/test',
}

export const RoutePathAdmin: Record<AppRoutesAdmin, string> = {
  [AppRoutesAdmin.MAIN]: '/main',
  [AppRoutesCandidate.LOGIN]: '/login',
  [AppRoutesCandidate.DEFAULT]: '*',
  [AppRoutesAdmin.TASK_SET]: '/tests',
  [AppRoutesAdmin.VACANCY]: '/vacancy',
}

export const routeConfigCandidate: Record<AppRoutesCandidate, RouteProps> = {
  [AppRoutesCandidate.CANDIDATE_MAIN]: {
    path: RoutePathCandidate.main,
    element: <MainPage />,
  },
  [AppRoutesCandidate.LOGIN]: {
    path: RoutePathCandidate.login,
    element: <LoginPage />,
  },
  [AppRoutesCandidate.CANDIDATE_TEST]: {
    path: RoutePathCandidate.test,
    element: <TestPage />,
  },
  [AppRoutesCandidate.DEFAULT]: {
    path: RoutePathCandidate.default,
    element: <Navigate to={RoutePathCandidate.login} replace />,
  },
}

export const routeConfigAdmin: Record<AppRoutesAdmin, RouteProps> = {
  [AppRoutesAdmin.MAIN]: {
    path: RoutePathAdmin.main,
    element: <AdminMainPage />,
  },
  [AppRoutesAdmin.LOGIN]: {
    path: RoutePathCandidate.login,
    element: <LoginPage />,
  },
  [AppRoutesAdmin.DEFAULT]: {
    path: RoutePathCandidate.default,
    element: <Navigate to={RoutePathCandidate.login} replace />,
  },
  [AppRoutesAdmin.TASK_SET]: {
    path: RoutePathAdmin.tests,
    element: <AdminTaskSetsPage />,
  },
  [AppRoutesAdmin.VACANCY]: {
    path: RoutePathAdmin.vacancy,
    element: <VacancyPage />,
  },
}
