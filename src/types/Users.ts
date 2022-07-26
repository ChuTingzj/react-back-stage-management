import type { RolesList } from './Right'
interface userItem {
  id: number
  username: string
  password: number
  roleState: boolean
  default: boolean
  region: string
  roleId: number
}
interface regionItem {
  id: number
  title: string
  value: string
}
type FormData = Omit<userItem, 'id' | 'roleState' | 'default'> | {}
interface UserAndRole extends userItem, RolesList {}
export type { userItem, regionItem, FormData, UserAndRole }
