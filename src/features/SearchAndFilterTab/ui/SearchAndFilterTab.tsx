import React, { useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SearchAndFilterTab.module.scss'
import { SearchField } from './Search/Search'
import Select from 'react-select'
import { useSelector } from 'react-redux'
import { getTaskSets, getTaskSetsName } from 'entities/Admin/TaskSets'
import TestSvg from 'shared/assets/icon/test.svg'
import VacancyImg from 'shared/assets/icon/icons8-vacancy-64.png'

import { MySelect } from 'shared/ui/Select/Select'
import { getVacancies } from 'entities/Admin/Vacancies'
import { User } from 'entities/User'

interface SearchAndFilterTabProps {
  className?: string
  list: User[] | null
  initList: User[] | null
  changeList: (newList: User[]) => void
}

export const SearchAndFilterTab: React.FC<SearchAndFilterTabProps> = (props) => {
  const { className = '', list, changeList, initList } = props
  const [searchText, setSearchText] = useState<string>('')
  const [filterOption, setFilterOption] = useState<{
    taskSet: string | null
    vacancy: string | null
  }>({ taskSet: null, vacancy: null })
  const taskSets = useSelector(getTaskSets)
  const vacancies = useSelector(getVacancies)

  useEffect(() => {
    let workList = initList
    if (filterOption.taskSet && workList) {
      workList = filterTaskSet(workList)
    }
    if (filterOption.vacancy && workList) {
      workList = filterVacancy(workList)
    }
    if (searchText !== '' && workList) {
      workList = filterBySearch(workList)
    }
    workList && changeList(workList)
  }, [filterOption, searchText])

  const changeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText)
  }
  const changeVacancyFilter = (newValue: null | string[] | string) => {
    if (!Array.isArray(newValue)) {
      setFilterOption({ vacancy: newValue, taskSet: filterOption.taskSet })
    }
  }
  const changeTaskSetFilter = (newValue: string | null | string[]) => {
    if (!Array.isArray(newValue)) {
      setFilterOption({ vacancy: filterOption.vacancy, taskSet: newValue })
    }
  }
  const filterVacancy = (workList: User[]) => {
    const newList = workList?.filter((el) => {
      if (!filterOption.vacancy) return true
      return el.vacancies.find((vacancy) => vacancy.vacancyName === filterOption.vacancy)
    })
    return newList
  }
  const filterTaskSet = (workList: User[]) => {
    const taskSetFilter = taskSets.find((el) => el.name === filterOption.taskSet)

    const newList = workList?.filter((el) => {
      if (!filterOption.taskSet) return true
      return el.vacancies.find((vacancy) => vacancy.vacancyId === taskSetFilter?.id)
    })
    return newList
  }
  const filterBySearch = (workList: User[]) => {
    const newList = workList?.filter((user) => {
      let text = searchText.toLocaleLowerCase().split(' ')
      return text.some(
        (el) =>
          user.name.toLocaleLowerCase().includes(el) ||
          user.surname.toLocaleLowerCase().includes(el) ||
          user.patronymic?.toLocaleLowerCase().includes(el)
      )
    })
    return newList
  }

  return (
    <div className={classNames(cls.searchAndFilterTab, {}, [className])}>
      <SearchField value={searchText} onChange={changeSearchText} className={cls.search} />
      <MySelect
        options={vacancies.map((vacancy) => {
          return { label: vacancy.name, value: vacancy.name }
        })}
        placeHolder={'Фильтр по вакансиям'}
        imgSrc={VacancyImg}
        changeSelect={changeVacancyFilter}
        className={cls.select}
      />
      <MySelect
        options={taskSets.map((el) => {
          return { label: el.name, value: el.name }
        })}
        placeHolder={'Фильтр по тестам'}
        imgSrc={TestSvg}
        changeSelect={changeTaskSetFilter}
        className={cls.select}
      />
    </div>
  )
}
