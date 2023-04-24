import {StatusItemTest} from '../const/testConst'

export interface TestUser {
  currentItem: number | string
  allCountItem: number
  statusItem: {[key: string | number]: StatusItemTest}
}

export interface TestUserSchema {
  isLoading?: boolean
  error?: string | null
  data: TestUser
}
