interface RightList {
  id: number
  title: string
  key: string
  pagepermisson: number
  grade: number
  children: RightList[]
}
interface RolesList {
  id: number
  roleName: string
  roleType: number
  rights: string[]
}
type right_RolesList = Pick<RolesList, 'rights'>['rights']
export type { RightList, RolesList, right_RolesList }
