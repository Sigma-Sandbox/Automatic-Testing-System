import React, { useEffect, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './VacancyPage.module.scss'
import { SearchField } from 'features/SearchAndFilterTab'
import { Button, SizeButton } from 'shared/ui/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider'
import { Loader } from 'shared/ui/Loader/Loader'
import { fetchVacanciesData, vacanciesActions } from 'entities/Admin/Vacancies'
import { AppDispatch } from 'app/providers/StoreProvider/config/store'
import { Vacancy } from 'entities/Admin/Vacancies'
import { VacancyCard } from 'widgets/Admin/VacancyCard'
import { cardEditStatus } from 'features/CreateAndEditCard'
import { CreateOrEditVacancy } from 'features/CreateAndEditVacancy'
import { fetchTaskSetsData } from 'entities/Admin/TaskSets'

interface VacancyPageProps {
  className?: string
}

export const VacancyPage: React.FC<VacancyPageProps> = (props) => {
  const { className = '' } = props
  const vacanciesListInit = useSelector((state: StateSchema) => state.vacancies.data)
  const vacanciesListLoader = useSelector((state: StateSchema) => state.vacancies.isLoading)
  const check = useSelector((state: StateSchema) => state)

  const [vacanciesList, setVacanciesList] = useState<Vacancy[]>([])
  const [createAndEdit, setCreateAndEdit] = useState<{
    status: cardEditStatus
    editCard: Vacancy | null
  }>({ status: cardEditStatus.CLOSE, editCard: null })

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (vacanciesListInit.length === 0) {
      dispatch(fetchVacanciesData({}))
      dispatch(fetchTaskSetsData({}))
    } else {
      setVacanciesList(vacanciesListInit)
    }
  }, [vacanciesListInit])

  const startEditVacancy = (vacancy: Vacancy) => {
    setCreateAndEdit({ status: cardEditStatus.EDIT, editCard: vacancy })
  }
  const startCreateVacancy = () => {
    setCreateAndEdit({ status: cardEditStatus.CREATE, editCard: null })
  }
  const finishEditVacancy = () => {
    setCreateAndEdit({ status: cardEditStatus.CLOSE, editCard: null })
  }

  const vacanciesListMemo = useMemo(() => {
    return vacanciesList.map((vacancy) => (
      <VacancyCard key={vacancy.id} className={cls.vacancy} vacancy={vacancy} startEdit={startEditVacancy} />
    ))
  }, [vacanciesList])

  return (
    <div className={classNames(cls.vacancyPage, {}, [className])}>
      <div className={cls.headerTab}>
        <SearchField value="" onChange={(text) => console.log(text)}></SearchField>
        <Button size={SizeButton.L} onClick={startCreateVacancy}>
          Добавить вакансию
        </Button>
      </div>
      <div className={cls.vacancies}>
        {vacanciesListLoader && <Loader></Loader>}
        {vacanciesListMemo}
        {createAndEdit.status !== cardEditStatus.CLOSE && (
          <CreateOrEditVacancy vacancy={createAndEdit.editCard} finishEditVacancy={finishEditVacancy} />
        )}
      </div>
    </div>
  )
}
