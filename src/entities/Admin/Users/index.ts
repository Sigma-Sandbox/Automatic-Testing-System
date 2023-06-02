// import { getUserNavbar } from './model/selectors/getUserNavbarData/getUserNavbarData'
// import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData'

// import { userReducer, userActions } from './model/slice/userSlice'

// export type { UserSchema, User } from './model/types/user'
// export { getUserNavbar, getUserAuthData, userReducer, userActions }

export type {UsersSchema, UserSolution} from './model/types/users'
export {getUsersList} from './model/selectors/getUsersList/getUsersList'
export {getTotalScoreTaskSet} from './model/selectors/getTotalScoreTaskSet/getTotalScoreTaskSet'
export {getUserSolution} from './model/selectors/getUserSolution/getUserSolution'

export {fetchUsersData} from './model/service/fetchUsersData/fetchUsersData'

export {usersDataActions, usersDataReducer} from './model/slice/usersSlice'
