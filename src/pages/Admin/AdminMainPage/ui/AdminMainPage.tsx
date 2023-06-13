import React, { useEffect, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AdminMainPage.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { User } from 'entities/User'
import { fetchUsersData, getUsersList } from 'entities/Admin/Users'
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

  const loadUsersList = useSelector((state: StateSchema) => state.allUsersData.isLoading)

  useEffect(() => {
    dispatch(fetchTaskSetsData({}))
    dispatch(fetchVacanciesData({}))
    dispatch(fetchUsersData({}))
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
    setCreateAndEdit({ status: cardEditStatus.CLOSE, editCard: null })
  }

  const cardListUsers = useMemo(() => {
    if (usersList)
      return usersList.map((user) => <UserMainCard startEditCard={startEditCard} key={user.id} user={user} />)
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
        className={classNames(cls.usersList, {
          [cls.loader]: loadUsersList || cardListUsers?.length === 0,
        })}
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
