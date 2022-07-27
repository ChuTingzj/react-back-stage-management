import request from '@/utils/request'
export const getMenuItemList = () => request('/rights?_embed=children')
export const pullMainNews = () =>
  request('/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6')
export const pullStarNews = () =>
  request('/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6')
export const pullAllNews = () => request('/news?publishState=2&_expand=category')
