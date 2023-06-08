import React, { useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'
import Select, { MultiValue, SingleValue } from 'react-select'

export type SelectOption = {
  value: string
  label: string
}
interface SelectProps {
  className?: string
  selected?: SelectOption | SelectOption[] | null
  placeHolder?: string
  changeSelect: (newValue: string[] | string | null) => void
  imgSrc?: string
  options: SelectOption[]
  isMulti?: boolean
}

export const MySelect: React.FC<SelectProps> = (props) => {
  const { className = '', imgSrc, options, placeHolder, changeSelect, isMulti = false, selected } = props
  const [value, setValue] = useState<SelectOption | readonly SelectOption[] | null>(selected ? selected : null)

  const onChange = (newValue: readonly SelectOption[] | SelectOption | null) => {
    setValue(newValue)
    if (Array.isArray(newValue)) {
      changeSelect(newValue?.map((value) => value.value) || [])
    } else {
      // TODO problems with type
      //@ts-ignore
      changeSelect(newValue ? newValue.value : newValue)
    }
  }
  return (
    <div className={cls.select}>
      {imgSrc && <img src={imgSrc} alt="icon select" className={cls.selectImg} />}
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            paddingLeft: imgSrc && '25px',
            backgroundColor: 'var(--invert-bg-color)',
            color: 'var(--font-color)',
            borderRadius: '10px',
            boxShadow: 'var(--shadow-block)',
            overflow: 'auto',
          }),
          menu: (baseStyles, state) => ({
            ...baseStyles,
            zIndex: 100,
          }),
        }}
        name="colors"
        options={options}
        className={classNames(cls.selectOpt, {}, [className])}
        classNamePrefix="select"
        placeholder={placeHolder}
        isClearable
        value={value}
        onChange={onChange}
        isMulti={isMulti}
      />
    </div>
  )
}
