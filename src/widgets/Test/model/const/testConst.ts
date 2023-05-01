import { ProgrammingLanguage } from 'core/enums'

export enum StatusItemTest {
  LOADER = 'loader',
  SUCCESS = 'success',
  FALSE = 'false',
  DISABLE = 'disable',
  ENABLE = 'enable',
}

export interface Language {
  id: number
  name: string
  label: string
  value: ProgrammingLanguage
}

export const languageOptions: Language[] = [
  {
    id: 63,
    name: 'JavaScript (Node.js 12.14.0)',
    label: 'JavaScript (Node.js 12.14.0)',
    value: ProgrammingLanguage.JavaScript
  },
  {
    id: 62,
    name: 'Java (OpenJDK 13.0.1)',
    label: 'Java (OpenJDK 13.0.1)',
    value: ProgrammingLanguage.Java
  },
]
