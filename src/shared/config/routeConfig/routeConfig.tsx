import { LoginPage } from 'pages/LoginPage'
import { MainPage } from 'pages/Candidate/MainPage'
import { TestPage } from 'pages/Candidate/TestPage'
import { Navigate, RouteProps } from 'react-router-dom'
import { AdminMainPage } from 'pages/Admin/AdminMainPage'
import { AdminTaskSetsPage } from 'pages/Admin/AdminTaskSetsPage'
import { VacancyPage } from 'pages/Admin/VacancyPage'
import { CreateTaskPage } from 'pages/Admin/CreateTaskPage'

export enum AppRoutes {
  LOGIN = 'login',
  MAIN = 'main',
  DEFAULT = 'default',
  TASK_SET = 'tests',
  VACANCY = 'vaca',
  CREATE = 'create',
  CANDIDATE_VACANCY = 'vacancy',
  CANDIDATE_TEST = 'test',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/main',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.DEFAULT]: '*',
  [AppRoutes.TASK_SET]: '/tests',
  [AppRoutes.VACANCY]: '/vaca',
  [AppRoutes.CREATE]: '/create',
  [AppRoutes.CANDIDATE_VACANCY]: '/vacancy/:userId',
  [AppRoutes.CANDIDATE_TEST]: '/test',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <AdminMainPage />,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
  },
  [AppRoutes.DEFAULT]: {
    path: RoutePath.default,
    element: <Navigate to={RoutePath.login} replace />,
  },
  [AppRoutes.TASK_SET]: {
    path: RoutePath.tests,
    element: <AdminTaskSetsPage />,
  },
  [AppRoutes.VACANCY]: {
    path: RoutePath.vaca,
    element: <VacancyPage />,
  },
  [AppRoutes.CREATE]: {
    path: RoutePath.create,
    element: <CreateTaskPage />,
  },
  [AppRoutes.CANDIDATE_VACANCY]: {
    path: RoutePath.vacancy,
    element: <MainPage />,
  },
  [AppRoutes.CANDIDATE_TEST]: {
    path: RoutePath.test,
    element: <TestPage />,
  },
}
