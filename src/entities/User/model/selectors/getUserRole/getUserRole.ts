import {StateSchema} from 'app/providers/StoreProvider'
import {UserRole} from 'core/enums'

export const getUserRole = (state: StateSchema): UserRole | undefined =>
  state.user.authData?.accessRights
