import { UserRole } from '../consts/userConsts'

export interface User {
  id: string
  username: string
  firstname: string
  lastname: string
  roles: UserRole
  position: string
}

export interface UserSchema {
  authData?: User
}
