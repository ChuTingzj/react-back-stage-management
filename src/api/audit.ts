import request from '@/utils/request'
export const pullAuditList = (username: string) =>
  request(`/news?author=${username}&auditState_ne=0&publishState_Ite=1&_expand=category`)
export const recall = (id: number) => request.patch(`/news/${id}`, { auditState: 0 })
export const publish = (id: number) => request.patch(`/news/${id}`, { publishState: 2 })
export const pullAuditNews = () => request('/news?auditState=1&_expand=category')
export const passOrReject = (id: number, auditState: number, publishState: number) =>
  request.patch(`/news/${id}`, {
    auditState,
    publishState
  })
