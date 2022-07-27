import request from '@/utils/request'
export const follow = (id: number) => request(`/news/${id}?_expand=category&_expand=role`)
export const like = (id: number, view: number) => request.patch(`/news/${id}`, { view })
