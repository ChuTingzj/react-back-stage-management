import request from '@/utils/request'
import type { News, NewsPatch } from '@/types/News'
export const getCategory = () => request.get('/categories')
export const postNews = (data: News) => request.post('/news', { ...data })
export const getDraftList = (username: string) =>
  request(`/news?author=${username}&auditState=0&_expand=category`)
export const deleteNews = (id: number) => request.delete(`/news/${id}`)
export const getNewsInfo = (id: number) => request.get(`/news/${id}?_expand=category&_expand=role`)
export const updateNewsInfo = (data: NewsPatch, id: number) =>
  request.patch(`/news/${id}`, { ...data })
export const pushCheck = (id: number) => request.patch(`/news/${id}`, { auditState: 1 })
export const deleteCategory = (id: number) => request.delete(`/categories/${id}`)
export const editCategory = (id: number, title: string, value: string) =>
  request.patch(`/categories/${id}`, { title, value })
