enum FirstRouter {
  '/home',
  '/user-manage',
  '/right-manage',
  '/news-manage',
  '/audit-manage',
  '/publish-manage'
}
interface RightsItem {
  id: number
  title: string
  rightId?: number
  key: string
  grade: number
  pagepermisson?: number
  routepermisson?: number
}
export type { RightsItem, FirstRouter }
