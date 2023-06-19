import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AdminMainPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { User, getUserAuthData } from 'entities/User'
import { fetchUsersData, getUsersList, usersDataActions } from 'entities/Admin/Users'
import { AppDispatch } from 'app/providers/StoreProvider/config/store'
import { StateSchema } from 'app/providers/StoreProvider'
import { UserMainCard } from 'widgets/Admin/UserMainCard'
import { Loader } from 'shared/ui/Loader/Loader'
import AddUserSvg from 'shared/assets/icon/account_add.svg'
import { fetchTaskSetsData } from 'entities/Admin/TaskSets'
import { fetchVacanciesData } from 'entities/Admin/Vacancies'
import { SearchAndFilterTab } from 'features/SearchAndFilterTab'
import { CreateOrEditCard, cardEditStatus } from 'features/CreateAndEditCard'
import { Button, SizeButton } from 'shared/ui/Button/Button'
import { NotFoundElements } from 'shared/ui/NotFoundElements/NotFoundElements'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { loginByUsername } from 'features/auth/by-pass'
import { useAuthLocalStrorage } from 'shared/lib/hooks/useAuthLocalStrorage/useAuthLocalStrorage'
import { fetchDeleteUser } from '../model/service/fetchDeleteUser'

interface AdminMainPageProps {
  className?: string
}

export const AdminMainPage: React.FC<AdminMainPageProps> = (props) => {
  const { className = '' } = props
  const dispatch = useDispatch<AppDispatch>()
  const [usersList, setUserList] = useState<User[] | null>(null)
  const userListInit = useSelector(getUsersList)
  const [createAndEdit, setCreateAndEdit] = useState<{
    status: cardEditStatus
    editCard: User | null
  }>({ status: cardEditStatus.CLOSE, editCard: null })

  const [checkAuthLocalStorage, clearAuthData] = useAuthLocalStrorage()

  const loadUsersList = useSelector((state: StateSchema) => state.allUsersData.isLoading)

  useEffect(() => {
    checkAuthLocalStorage()
    dispatch(fetchTaskSetsData({}))
    dispatch(fetchVacanciesData({}))
    dispatch(fetchUsersData({}))
  }, [])

  useEffect(() => {
    console.log('update main')
  }, [])

  useEffect(() => {
    if (usersList === null || (usersList && usersList.length === 0) || (userListInit && userListInit?.length > 0)) {
      setUserList(userListInit)
    }
  }, [userListInit])

  const changeUsersList = (newUsersList: User[]) => {
    setUserList(newUsersList)
  }

  const startEditCard = (user: User) => {
    setCreateAndEdit({ status: cardEditStatus.EDIT, editCard: user })
  }
  const startCreateCard = () => {
    setCreateAndEdit({ status: cardEditStatus.CREATE, editCard: null })
  }
  const finishEditCard = () => {
    dispatch(fetchUsersData({}))
    setCreateAndEdit({ status: cardEditStatus.CLOSE, editCard: null })
  }

  const deleteUser = async (user: User) => {
    const response = await fetchDeleteUser(user)

    if (response === 'OK') {
      dispatch(usersDataActions.setDeleteUser(user))
    }
  }

  const cardListUsers = useMemo(() => {
    if (usersList)
      return usersList
        .map((user) => <UserMainCard deleteCard={deleteUser} startEditCard={startEditCard} key={user.id} user={user} />)
        .reverse()
  }, [usersList])

  return (
    <div className={classNames(cls.adminMainPage, { [cls.loader]: loadUsersList }, ['container', className])}>
      <div className={cls.headTab}>
        <Button onClick={startCreateCard} className={cls.addCard} size={SizeButton.XL}>
          <img src={AddUserSvg} alt="add user" />
        </Button>
        <SearchAndFilterTab
          initList={userListInit}
          list={usersList}
          changeList={changeUsersList}
          className={cls.searchTab}
        />
      </div>
      {createAndEdit.status !== cardEditStatus.CLOSE && (
        <CreateOrEditCard user={createAndEdit.editCard} finishEditCard={finishEditCard}></CreateOrEditCard>
      )}

      <div
        className={classNames(
          cls.usersList,
          {
            [cls.loader]: loadUsersList || cardListUsers?.length === 0,
          },
          ['custom_scroll']
        )}
      >
        {loadUsersList ? (
          <Loader />
        ) : cardListUsers && cardListUsers.length > 0 ? (
          cardListUsers
        ) : (
          <NotFoundElements text="Соискатели не найдены" />
        )}
      </div>
    </div>
  )
}
