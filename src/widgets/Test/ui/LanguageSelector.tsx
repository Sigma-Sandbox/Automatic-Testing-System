import React from "react"
import Select, { SingleValue } from 'react-select'
import { Language, languageOptions } from '../model/const/testConst'
import { Condition } from 'core/entities'

interface LanguageSelectorProps {
  languages: Condition[]
  onSelectChange: (language: SingleValue<Language>) => void
}
const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, onSelectChange}) => {
  const arrLanguages = languages.map(l => l.language)
  const options = languageOptions.filter(l => arrLanguages.includes(l.value))

  return (
    <Select
      placeholder={`Filter By Category`}
      options={options}
      defaultValue={options[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
      styles={{
        control: (provided, state) => ({
          ...provided,
          minHeight: '35px',
          height: '35px'
        })}}
    />
  )
}

export default LanguageSelector