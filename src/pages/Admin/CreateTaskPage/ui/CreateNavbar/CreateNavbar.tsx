import React, { useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CreateNavbar.module.scss'
import { SearchField } from 'features/SearchAndFilterTab'
import { MySelect } from 'shared/ui/Select/Select'

import filterImg from 'shared/assets/icon/filter.svg'
import { ProgTask, TestTask } from 'entities/Candidate/TestTask'
import { useSelector } from 'react-redux'
import { getAllTestTask } from 'entities/Admin/TestTask'
import { getAllProgTask } from 'entities/Admin/ProgTask'

interface CreateNavbarProps {
  className?: string
  langs: string[]
  changeList: (newProgList: ProgTask[] | null, newTestList: TestTask[] | null) => void
}

export const CreateNavbar: React.FC<CreateNavbarProps> = (props) => {
  const { className = '', langs, changeList } = props

  const [searchValue, setSearchValue] = useState<string>('')
  const [filterOption, setFilterOption] = useState<{
    lang: string | null
  }>({ lang: null })
  const testTasksInit = useSelector(getAllTestTask)
  const progTasksInit = useSelector(getAllProgTask)

  useEffect(() => {
    let workListProg = progTasksInit
    let workListTest = testTasksInit
    if (filterOption.lang) {
      if (workListProg) workListProg = filterByLang(workListProg)
    }

    if (searchValue !== '') {
      const newList = filterBySearch(workListProg, workListTest)
      workListProg = newList.newListProg
      workListTest = newList.newListTest
    }
    changeList(workListProg, workListTest)
  }, [filterOption, searchValue])

  const onChangeSearchValue = (newValue: string) => {
    setSearchValue(newValue)
  }

  const changeVacancyFilter = (newValue: null | string[] | string) => {
    if (!Array.isArray(newValue)) {
      setFilterOption({ lang: newValue })
    }
  }

  const filterByLang = (workList: ProgTask[]) => {
    const newList = workList?.filter((el) => {
      if (!filterOption.lang) return true
      return el.conditions.find((cond) => cond.language.includes(filterOption.lang || ''))
    })
    return newList
  }

  const filterBySearch = (workListProg: ProgTask[], workListTest: TestTask[]) => {
    let text = searchValue.toLocaleLowerCase()
    const newListProg = workListProg?.filter((progTask) => {
      if (!searchValue) return true
      return progTask.name.toLocaleLowerCase().includes(text) || progTask.description.toLocaleLowerCase().includes(text)
    })

    const newListTest = workListTest?.filter((testTask) => {
      if (!searchValue) return true
      // TODO: select color search text
      return (
        testTask.name.toLocaleLowerCase().includes(text) ||
        testTask.description.toLocaleLowerCase().includes(text) ||
        testTask.questions.find((question) => {
          return question.description.toLocaleLowerCase().includes(text)
        })
      )
    })

    return { newListProg, newListTest }
  }

  return (
    <div className={classNames(cls.createNavbar, {}, [className])}>
      <SearchField value={searchValue} onChange={onChangeSearchValue} />
      <MySelect
        options={langs.map((lang) => {
          return { label: lang, value: lang }
        })}
        placeHolder={'Язык программирования'}
        imgSrc={filterImg}
        changeSelect={changeVacancyFilter}
        wrapClass={cls.selectLang}
      />
    </div>
  )
}
