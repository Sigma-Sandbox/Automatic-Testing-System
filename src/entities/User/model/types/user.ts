import { UserRole } from 'core/enums'

export interface User {
  id: number
  username: string
  firstname: string
  lastname: string
  roles: UserRole
  position: string
}

export interface UserSchema {
  authData?: User
}
