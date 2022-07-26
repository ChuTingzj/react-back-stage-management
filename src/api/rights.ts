import request from '@/utils/request'
import type { right_RolesList } from '@/types/Right'
export const deleteMenuItem = (id: number) => request.delete(`/rights/${id}`)
export const deleteSecItem = (id: number) => request.delete(`/children/${id}`)
export const changePermission = (id: number, permission: number) =>
  request.patch(`/rights/${id}`, { pagepermisson: permission })
export const changeSecPermission = (id: number, permission: number) =>
  request.patch(`/children/${id}`, { pagepermisson: permission })
export const getRolesList = () => request('/roles')
export const deleteRoles = (id: number) => request.delete(`/roles/${id}`)
export const getRightList = () => request('/rights?_embed=children')
export const changeChecked = (id: number, rights: right_RolesList) =>
  request.patch(`/roles/${id}`, { rights })
