import { StatusItemTest } from '../const/testConst'

export interface TestUser {
  currentItem: number | string
  allCountItem: number
  statusItem: { [key: string | number]: { status: StatusItemTest; id: number | string } }
  timeLimits?: number
  currentTestId: number
}

export interface TestUserSchema {
  isLoading?: boolean
  error?: string | null
  data: TestUser
}
