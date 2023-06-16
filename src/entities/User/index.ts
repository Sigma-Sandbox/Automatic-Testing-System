import { getUserNavbar } from './model/selectors/getUserNavbarData/getUserNavbarData'
import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData'
import { getUserRole } from './model/selectors/getUserRole/getUserRole'

import { getUserCurTaskSetData } from './model/selectors/getUserCurTaskSetData/getUserCurTaskSetData'

import { userReducer, userActions } from './model/slice/userSlice'

export type { UserSchema, User, ResultVacancyTest } from './model/types/user'
export { getUserNavbar, getUserAuthData, userReducer, userActions, getUserRole, getUserCurTaskSetData }
