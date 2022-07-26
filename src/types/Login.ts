interface userInfo {
  default: boolean
  id: number
  password: number
  region: string
  role: {
    id: number
    rights:
      | {
          checked: string[]
          halfChecked: Array<any>
        }
      | string[]
    roleName: string
    roleType: number
  }
  roleId: number
  roleState: boolean
  username: string
}
export type { userInfo }
