import request from '@/utils/request'
import type { FormData } from '@/types/Users'
export const getUserList = () => request('/users?_expand=role')
export const getRegionList = () => request('/regions')
export const postUsers = (value: FormData) =>
  request.post('users', { ...value, roleState: true, default: false })
export const deleteUsers = (id: number) => request.delete(`users/${id}`)
export const changeStatus = (id: number, status: boolean) =>
  request.patch(`/users/${id}`, { roleState: status })
export const updateUser = (id: number, value: FormData) =>
  request.patch(`users/${id}`, { ...value })
