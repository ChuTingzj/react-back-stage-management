import request from '@/utils/request'
export const getMenuItemList = () => request('/rights?_embed=children')
