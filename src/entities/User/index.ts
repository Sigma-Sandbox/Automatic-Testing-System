import {getUserNavbar} from './model/selectors/getUserNavbarData/getUserNavbarData'
import {getUserAuthData} from './model/selectors/getUserAuthData/getUserAuthData'
import {getUserRole} from './model/selectors/getUserRole/getUserRole'

import {userReducer, userActions} from './model/slice/userSlice'

export type {UserSchema, User} from './model/types/user'
export {getUserNavbar, getUserAuthData, userReducer, userActions, getUserRole}
