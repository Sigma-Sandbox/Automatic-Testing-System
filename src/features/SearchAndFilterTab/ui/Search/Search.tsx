import React, {useState} from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './Search.module.scss'
import {Input} from 'shared/ui/Input/Input'
import searchSvg from 'shared/assets/icon/search.svg'

interface SearchProps {
  className?: string
  value: string
  onChange: (newValue: string) => void
}

export const SearchField: React.FC<SearchProps> = (props) => {
  const {className = '', value, onChange} = props
  const [isFocus, setIsFocus] = useState<boolean>(false)

  return (
    <div className={classNames(cls.search, {}, [className])}>
      <Input
        icon={searchSvg}
        className={classNames(cls.searchInput, {[cls.focus]: isFocus})}
        placeholder='Поиск'
        value={value}
        onChange={onChange}
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
      ></Input>
    </div>
  )
}
