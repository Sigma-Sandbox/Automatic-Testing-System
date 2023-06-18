import React from 'react'
import Select, { SingleValue } from 'react-select'
import { Language, languageOptions } from '../model/const/testConst'
import { Condition } from 'core/entities'

interface LanguageSelectorProps {
  languages: Condition[]
  onSelectChange: (language: SingleValue<Language>) => void
  select: Language
}
const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, onSelectChange, select }) => {
  const arrLanguages = languages.map((l) => l.language)
  const options = languageOptions.filter((l) => arrLanguages.includes(l.value))

  return (
    <Select
      placeholder={`Filter By Category`}
      options={options}
      value={select}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
      isSearchable={true}
    />
  )
}

export default LanguageSelector
