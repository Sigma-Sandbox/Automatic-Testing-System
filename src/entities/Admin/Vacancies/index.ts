// import { getUserNavbar } from './model/selectors/getUserNavbarData/getUserNavbarData'
// import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData'

export {vacanciesActions, vacanciesReducer} from './model/slice/VacanciesSlice'

export {fetchVacanciesData} from './model/service/fetchVacanciesData/fetchVacanciesData'

export {getVacanciesName} from './model/selectors/getVacanciesName/getVacanciesName'

export type {VacanciesSchema, Vacancy} from './model/types/VacanciesTypes'
// export { getUserNavbar, getUserAuthData, userReducer, userActions }
