interface AuditListItem {
  title: string
  categoryId: number
  content: string
  region: string
  author: string
  roleId: number
  auditState: number
  publishState: number
  createTime: number
  star: number
  view: number
  id: number
  publishTime: number
  category: {
    id: number
    title: string
    value: string
  }
}
interface AuditNewsItem {
  title: string
  categoryId: number
  content: string
  region: string
  author: string
  roleId: number
  auditState: number
  publishState: number
  createTime: number
  star: number
  view: number
  id: number
  category: {
    id: number
    title: string
    value: string
  }
}
export type { AuditListItem, AuditNewsItem }
