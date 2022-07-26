interface NewsCategory {
  id: number
  title: string
  value: string
}
interface News {
  title?: string
  categoryId?: number
  content?: string
  region?: string
  author?: string
  roleId?: number
  auditState?: number
  publishState?: number
  createTime?: number
  star?: number
  view?: number
  publishTime?: number
}
type DraftItem = Required<News> & {
  category: { id: number; title: string; value: string }
  id: number
}
type previewInfo = News & {
  category?: { id: number; title: string; value: string }
  id?: number
  roleName?: string
  roleType?: number
  rights?: Array<any> | { checked: Array<any> }
  halfChecked?: Array<any>
}
interface NewsPatch {
  title: string
  categoryId: number
  content: string
  auditState: number
}
export type { NewsCategory, News, DraftItem, previewInfo, NewsPatch }
