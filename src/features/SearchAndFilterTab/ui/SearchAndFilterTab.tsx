import React, {useEffect, useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './SearchAndFilterTab.module.scss'
import {SearchField} from './Search/Search'
import Select from 'react-select'
import {useSelector} from 'react-redux'
import {getTaskSetsName} from 'entities/Admin/TaskSets'
import TestSvg from 'shared/assets/icon/test.svg'
import VacancyImg from 'shared/assets/icon/icons8-vacancy-64.png'

import {MySelect} from 'shared/ui/Select/Select'
import {getVacanciesName} from 'entities/Admin/Vacancies'
import {User} from 'entities/User'

interface SearchAndFilterTabProps {
  className?: string
  list: User[] | null
  initList: User[] | null
  changeList: (newList: User[]) => void
}

export const SearchAndFilterTab: React.FC<SearchAndFilterTabProps> = (props) => {
  const {className = '', list, changeList, initList} = props
  const [searchText, setSearchText] = useState<string>('')
  const [filterOption, setFilterOption] = useState<{
    taskSet: string | null
    vacancy: string | null
  }>({taskSet: null, vacancy: null})
  const taskSetsName = useSelector(getTaskSetsName)
  const vacanciesName = useSelector(getVacanciesName)

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
      setFilterOption({vacancy: newValue, taskSet: filterOption.taskSet})
    }
  }
  const changeTaskSetFilter = (newValue: string | null | string[]) => {
    if (!Array.isArray(newValue)) {
      setFilterOption({vacancy: filterOption.vacancy, taskSet: newValue})
    }
  }
  const filterVacancy = (workList: User[]) => {
    const newList = workList?.filter((el) => {
      if (!filterOption.vacancy) return true
      return Object.keys(el.vacancies).includes(filterOption.vacancy)
    })
    return newList
  }
  const filterTaskSet = (workList: User[]) => {
    const newList = workList?.filter((el) => {
      for (let vacancy in el.vacancies) {
        for (let numOfTry in el.vacancies[vacancy]) {
          if (
            el.vacancies[vacancy][numOfTry].find((taskSet) => taskSet.name === filterOption.taskSet)
          ) {
            return true
          }
        }
      }
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
        options={vacanciesName.map((el) => {
          return {label: el, value: el}
        })}
        placeHolder={'Фильтр по вакансиям'}
        imgSrc={VacancyImg}
        changeSelect={changeVacancyFilter}
        className={cls.select}
      />
      <MySelect
        options={taskSetsName.map((el) => {
          return {label: el, value: el}
        })}
        placeHolder={'Фильтр по тестам'}
        imgSrc={TestSvg}
        changeSelect={changeTaskSetFilter}
        className={cls.select}
      />
    </div>
  )
}
