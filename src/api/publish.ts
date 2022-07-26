import request from '@/utils/request'
export const pullUnPublishList = (username: string, type: number) =>
  request(`/news?author=${username}&publishState=${type}&_expand=category`)
export const publish = (id: number) =>
  request.patch(`/news/${id}`, {
    publishState: 2,
    publishTime: +Date.now
  })
export const sunset = (id: number) =>
  request.patch(`/news/${id}`, {
    publishState: 3
  })
export const deleteNews = (id: number) => request.delete(`/news/${id}`)
