import {LoginPage} from 'pages/LoginPage'
import {MainPage} from 'pages/MainPage'
import {TestPage} from 'pages/TestPage'
import {Navigate, RouteProps} from 'react-router-dom'

export enum AppRoutes {
  LOGIN = 'login',
  MAIN = 'main',
  DEFAULT = 'default',
  TEST = 'test',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/main',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.DEFAULT]: '*',
  [AppRoutes.TEST]: '/test',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
  },
  [AppRoutes.TEST]: {
    path: RoutePath.test,
    element: <TestPage />,
  },
  [AppRoutes.DEFAULT]: {
    path: RoutePath.default,
    element: <Navigate to={RoutePath.login} replace />,
  },
}
