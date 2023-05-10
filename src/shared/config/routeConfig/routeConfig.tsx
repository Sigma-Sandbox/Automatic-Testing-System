import {LoginPage} from 'pages/LoginPage'
import {MainPage} from 'pages/Candidate/MainPage'
import {TestPage} from 'pages/Candidate/TestPage'
import {Navigate, RouteProps} from 'react-router-dom'

export enum AppRoutesCandidate {
  LOGIN = 'login',
  CANDIDATE_MAIN = 'main',
  DEFAULT = 'default',
  CANDIDATE_TEST = 'test',
}

export const RoutePathCandidate: Record<AppRoutesCandidate, string> = {
  [AppRoutesCandidate.CANDIDATE_MAIN]: '/main',
  [AppRoutesCandidate.LOGIN]: '/login',
  [AppRoutesCandidate.DEFAULT]: '*',
  [AppRoutesCandidate.CANDIDATE_TEST]: '/test',
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
